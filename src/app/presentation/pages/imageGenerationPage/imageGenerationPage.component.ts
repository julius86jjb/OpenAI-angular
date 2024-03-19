import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessagesComponent, MyMessageComponent, TypingLoaderComponent, TextMessagesBoxComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-generation-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessagesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessagesBoxComponent
  ],
  templateUrl: './imageGenerationPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGenerationPageComponent {

  public messages = signal<Message[]>([])
  public isLoading = signal<boolean>(false)

  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    this.isLoading.set(true);

    this.messages.update(prev =>
      [...prev, { isGpt: false, text: prompt }]);

    this.openAiService.imageGeneration(prompt)
      .subscribe(resp => {
        this.isLoading.set(false);

        if (resp.error) {
          this.messages.update(prev => [
            ...prev, { isGpt: true, text: resp.alt, imageInfo: {url: '', alt: '', error: true, errorMessage: resp.errorMessage} }
          ])
          return;
        }

        this.messages.update(prev => [
          ...prev, { isGpt: true, text: resp.alt, imageInfo: {url: resp.url, alt: resp.alt, error: false}}
        ])


      })
  }
}
