import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextMessagesBoxComponent } from '@components/index';

@Component({
  selector: 'app-text-message-stream-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './textMessageStreamBox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageStreamBoxComponent extends TextMessagesBoxComponent {

  @Output()  onAbort = new EventEmitter();



  handleAbort() {
    this.onAbort.emit();
  }
}
