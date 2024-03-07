import { Injectable } from '@angular/core';
import { OrthographyUseCaseResponse } from '@interfaces/orthography-use-case.response';
import { orthographyUseCase, prosConsStreamUseCase, prosConsUseCase, translateUseCase, textToAudioUseCase } from 'app/core/use-cases/index';
import { Observable, from } from 'rxjs';

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

}
