import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessagesComponent, MyMessageComponent, TypingLoaderComponent, TextMessagesBoxComponent, GptMessageEditableImageComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-tunning-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessagesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessagesBoxComponent,
    GptMessageEditableImageComponent
  ],
  templateUrl: './imageTunningPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPageComponent {
  public messages = signal<Message[]>([
    // {
    //   isGpt: true,
    //   text: 'dummy image',
    //   imageInfo: {
    //     error: false,
    //     alt: 'Dummy Image',
    //     url: 'http://localhost:3000/gpt/image-generation/1710671949989.png'
    //   }

    // }
  ])
  public isLoading = signal<boolean>(false)

  public openAiService = inject(OpenAiService);

  public originalImage = signal<string | undefined>(undefined)
  public maskImage = signal<string | undefined>(undefined)

  handleMessage(prompt: string) {
    this.isLoading.set(true);

    this.messages.update(prev =>
      [...prev, { isGpt: false, text: prompt }]);

    this.openAiService.imageGeneration(prompt, this.originalImage(), this.maskImage())
      .subscribe(resp => {
        this.isLoading.set(false);

        if (resp.error) {
          this.messages.update(prev => [
            ...prev, { isGpt: true, text: resp.alt, imageInfo: { url: '', alt: '', error: true, errorMessage: resp.errorMessage } }
          ])
          return;
        }

        this.messages.update(prev => [
          ...prev,
          { isGpt: true, text: resp.alt, imageInfo: { url: resp.url, alt: resp.alt, error: false } }
        ])


      })
  }


  generateVaration() {
    if (!this.originalImage()) return;

    this.isLoading.set(true);
    this.openAiService.imageVariation(this.originalImage()!)
      .subscribe(resp => {
        this.isLoading.set(false);
        if (!resp) return;

        this.messages.update(prev => [
          ...prev, { isGpt: true, text: resp.alt, imageInfo: { url: resp.url, alt: resp.alt, error: false } }
        ])
      })
  }


  handleImageChange(newImage: string, originalImage: string) {
    this.originalImage.set(originalImage);
    this.maskImage.set(newImage);
  }
}
