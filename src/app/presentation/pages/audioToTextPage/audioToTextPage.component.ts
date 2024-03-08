import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessagesComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxFileComponent, TextMessageEventFile } from '@components/index';
import { AudioToTextResponse } from '@interfaces/audio-to-text.response';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    ChatMessagesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent
  ],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {

  public messages = signal<Message[]>([])
  public isLoading = signal<boolean>(false)

  public openAiService = inject(OpenAiService);

  handleMessageWithFile({ prompt, file }: TextMessageEventFile) {

    const text = prompt ?? file.name ?? 'Transcript audio';

    this.isLoading.set(true);

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: text
      }
    ])

    this.openAiService.audioToText(file, text)
      .subscribe(resp => this.handleResponse(resp))
  }

  handleResponse(resp: AudioToTextResponse | null) {
    this.isLoading.set(false);
    if (!resp) return;

    const text = `## Transcription:
      __Duration:__${Math.round(resp.duration)} seconds

      ## Transcrption is:
      ${resp.text}
      `;

    this.messages.update( prev => [...prev, {isGpt: true, text:text}])


    for (const segment of resp.segments) {
      const segmentMessage = `__From ${Math.round(segment.start)} to ${ Math.round(segment.end)} seconds.__
      ${segment.text}
      `;

      this.messages.update( prev => [...prev, {isGpt: true, text:segmentMessage}])
    }
  }
}
