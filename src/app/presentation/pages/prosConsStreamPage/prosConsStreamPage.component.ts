import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessagesComponent } from "../../components/chat-bubbles/chatMessages/chatMessages.component";
import { MyMessageComponent } from "../../components/chat-bubbles/myMessage/myMessage.component";
import { TypingLoaderComponent } from "../../components/typingLoader/typingLoader.component";
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { TextMessageStreamBoxComponent } from '@components/text-boxes/textMessageStreamBox/textMessageStreamBox.component';

@Component({
    selector: 'app-pros-cons-stream-page',
    standalone: true,
    templateUrl: './prosConsStreamPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ChatMessagesComponent,
        MyMessageComponent,
        TypingLoaderComponent,
        TextMessageStreamBoxComponent
    ]
})
export  default class ProsConsStreamPageComponent {

  public messages = signal<Message[]>([])
  public isLoading = signal<boolean>(false)

  public openAiService = inject(OpenAiService);

  public abortSignal = new AbortController();
  // public abortSignal = signal(new AbortController());



  async handleMessage( prompt: string) {

    this.abortSignal.abort();
    this.abortSignal = new AbortController();

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      },
      {
        isGpt: true,
        text: '...'
      }
    ])

    this.isLoading.set(true);
    const stream = this.openAiService.prosConsStreamDiscusser(prompt, this.abortSignal.signal);
    this.isLoading.set(false);

    for await (const text of stream) {
      this.handleStreamResponse(text);
    }


  }

  handleStreamResponse(message: string) {
    this.messages().pop();
    const messages = this.messages();

    this.messages.set([...messages, {isGpt: true, text: message}])
  }

  handleAbortSignal() {
    this.abortSignal.abort();
  }

 }
