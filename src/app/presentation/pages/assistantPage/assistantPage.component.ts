import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessagesComponent, MyMessageComponent, TypingLoaderComponent, TextMessagesBoxComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { QuestionResponse } from '@interfaces/question.response';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-assistant-page',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    ChatMessagesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessagesBoxComponent
  ],
  templateUrl: './assistantPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssistantPageComponent implements OnInit {
  public messages = signal<Message[]>([])
  public isLoading = signal<boolean>(false)
  public openAiService = inject(OpenAiService);

  public threadId = signal<string | undefined>(undefined)

  ngOnInit(): void {
    this.openAiService.createThread()
      .subscribe(id => {
        this.threadId.set(id)
      })

    if (localStorage.getItem('thread')) {
      this.isLoading.set(true);
      this.loadThreadFromLocalStorage(localStorage.getItem('thread')!)
        .subscribe(replies => {
          this.updateMessages(replies);
        })
    }

  }


  handleMessage(question: string) {
    // console.log(question, this.threadId());
    this.messages.update(prev => [
      ...prev,
      {
        text: question,
        isGpt: false
      }
    ])
    this.isLoading.set(true);

    // this.messages.update(prev => [...prev, { text: question, isGpt: false }]);

    this.openAiService.postQuestion(this.threadId()!, question)
      .subscribe(replies => {
        this.updateMessages(replies);
      })
  }


  loadThreadFromLocalStorage(threadId: string) {
    return this.openAiService.getThreadMessages(threadId)
  }

  updateMessages(messages: QuestionResponse[]) {
    this.isLoading.set(false);
    this.messages.set([]);

    for (const message of messages) {
      this.messages.update(prev => [
        ...prev,
        {
          text: message.content[0],
          isGpt: message.role === 'assistant'
        }
      ])
    }
  }
  reloadThread() {
    localStorage.removeItem('thread');
    this.openAiService.createThread()
      .subscribe(id => {
        this.messages.set([]);
        this.threadId.set(id)
        this.loadThreadFromLocalStorage(id);
      })
  }
}
