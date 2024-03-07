import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule
  ],
  templateUrl: './chatMessages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessagesComponent {

  @Input({required: true}) text!: string;
  @Input() audioUrl?: string;
}
