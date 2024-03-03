import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { ChatMessagesComponent, MyMessageComponent, TextMessagesBoxComponent,
  TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TypingLoaderComponent,
  GptMessageOrthographyComponent } from '@components/index';

import { OpenAiService } from '../../services/openai.service';
import { OrthographyUseCaseResponse, Message } from '@interfaces/index';


@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessagesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessagesBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
    GptMessageOrthographyComponent
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

  public messages = signal<Message[]>([])
  public isLoading = signal<boolean>(false)

  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {

    this.isLoading.set(true),
      this.messages.update((prev) => [
        ...prev,
        {
          isGpt: false,
          text: prompt
        }
      ])

    // this.messages.update((prev) => {
    //   return [
    //     ...prev,
    //     {
    //       isGpt: false,
    //       text: prompt
    //     }
    //   ]
    // })

    this.openAiService.checkOrthography(prompt)
      .subscribe((resp: OrthographyUseCaseResponse) => {
        console.log(resp);
        this.isLoading.set(false);
        this.messages.update((prev: Message[]) => [
          ...prev,
          {
            isGpt: true,
            text: resp.message,
            info: resp
          }
        ])
        console.log(resp);
      })
  }
}
