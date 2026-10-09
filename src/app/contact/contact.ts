import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html', // <-- Aquí le quitamos el .component
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    checkAdult: new FormControl(false, [Validators.requiredTrue]),
    department: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required])
  });
}