import { Injectable } from '@angular/core';
import { OrthographyUseCaseResponse } from '@interfaces/orthography-use-case.response';
import { getThreadMessagesUseCase } from 'app/core/use-cases/assistant/get-thread-messages.use-case';
import { createThreadUseCase, postQuestionUseCase, orthographyUseCase, prosConsStreamUseCase, prosConsUseCase, translateUseCase, textToAudioUseCase, audioToTextUseCase, imageGenerationUseCase, imageVariationUseCase } from 'app/core/use-cases/index';
import { Observable, from, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAiService {


  checkOrthography(prompt: string): Observable<OrthographyUseCaseResponse> {
    return from(orthographyUseCase(prompt));
  }


  prosConsDiscusser(prompt: string) {
    return from(prosConsUseCase(prompt));
  }


  prosConsStreamDiscusser(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }

  translate(prompt: string, lang: string) {
    return from(translateUseCase(prompt, lang));
  }

  textToAudio(prompt: string, voice: string) {
    return from(textToAudioUseCase(prompt, voice));
  }


  audioToText(file: File, prompt?: string) {
    return from(audioToTextUseCase(file, prompt));
  }

  imageGeneration(prompt: string, originalImage?: string, maskImage?: string) {
    return from(imageGenerationUseCase(prompt, originalImage, maskImage))
  }

  imageVariation( originalImage: string) {
    return from(imageVariationUseCase( originalImage))
  }

  createThread(): Observable<string> {
    if(localStorage.getItem('thread')) {
      return of(localStorage.getItem('thread')!);
    }

    return from(createThreadUseCase())
      .pipe(
        tap((thread) => {
          localStorage.setItem('thread', thread);
        })
      )
  }

  postQuestion( threadId: string, question: string) {
    return from(postQuestionUseCase(threadId, question))
  }

  getThreadMessages(threadId: string) {
    return from(getThreadMessagesUseCase(threadId));
  }

}
