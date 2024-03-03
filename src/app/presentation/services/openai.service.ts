import { Injectable } from '@angular/core';
import { OrthographyUseCaseResponse } from '@interfaces/orthography-use-case.response';
import { orthographyUseCase } from 'app/core/use-cases/index';
import { Observable, from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {


  checkOrthography(prompt: string): Observable<OrthographyUseCaseResponse> {
    return from (orthographyUseCase(prompt));
  }


}
