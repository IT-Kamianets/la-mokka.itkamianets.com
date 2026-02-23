import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reservation.component.html',
})
export class ReservationComponent {
  private fb = inject(FormBuilder);

  submitted = signal(false);
  success = signal(false);

  minDate = new Date().toISOString().split('T')[0];

  timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30',
  ];

  guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[\d\s\+\-\(\)]{9,15}$/)]],
    date: ['', Validators.required],
    time: ['', Validators.required],
    guests: [2, [Validators.required, Validators.min(1), Validators.max(8)]],
    comments: [''],
  });

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted.set(true);
    if (this.form.invalid) return;
    // In a real app, send to backend or mailto
    this.success.set(true);
    this.form.reset({ guests: 2 });
    this.submitted.set(false);
  }

  resetForm() {
    this.success.set(false);
  }
}
