import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './chatMessages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessagesComponent {

  @Input({required: true}) text!: string;
}
