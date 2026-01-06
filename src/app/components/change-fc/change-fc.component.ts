import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-fc',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-fc.component.html',
  styleUrl: './change-fc.component.scss',
})
export class ChangeFcComponent {
  fc = new FormControl('');

  allowNum(e: Event) {
    const input = e.target as HTMLInputElement;
    const val = input?.value;
    if (!val) return;

    const filtered = val.replace(/[^0-9]/g, '');
    if (filtered !== val) {
      this.fc.setValue(filtered, { emitEvent: false });
    }
  }
}
