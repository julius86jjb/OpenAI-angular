import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Signal, inject, signal } from '@angular/core';
import { ChatMessagesComponent } from '@components/chat-bubbles/chatMessages/chatMessages.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessagesBoxComponent } from '@components/text-boxes/textMessageBox/text-messages-box.component';
import { TextMessageBoxFileComponent, TextMessageEventFile } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxEventSelect, TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '../../../interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';


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
    TextMessageBoxSelectComponent
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

  public messages = signal<Message[]>([{text: 'Hello Word', isGpt: false}])
  public isLoading = signal<boolean>(false)

  public openAiService = inject(OpenAiService);

  handleMessage( prompt: string) {

  }


  handleMessageWithFile( {prompt, file}: TextMessageEventFile) {
    console.log({prompt, file});
  }

  handleMessageWithSelect(event: TextMessageBoxEventSelect) {
    console.log(event)
  }

}
