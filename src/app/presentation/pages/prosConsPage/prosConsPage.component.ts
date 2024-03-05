import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessagesComponent, MyMessageComponent, TypingLoaderComponent, TextMessagesBoxComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ChatMessagesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessagesBoxComponent,
  ]
})
export default class ProsConsPageComponent {
  public messages = signal<Message[]>([])
  public isLoading = signal<boolean>(false)

  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    this.isLoading.set(true)
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ])

    this.openAiService.prosConsDiscusser(prompt)
      .subscribe((resp) => {
        console.log(resp);
        this.isLoading.set(false);
        this.messages.update((prev) => [
          ...prev,
          {
            isGpt: true,
            text: resp.content,
          }
        ])
      })
  }
}
