
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-typing-loader',
  standalone: true,
  imports: [],
  templateUrl: './typingLoader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl:'./typingLoader.component.css'
})
export class TypingLoaderComponent { }
