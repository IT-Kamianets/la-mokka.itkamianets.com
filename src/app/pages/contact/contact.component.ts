import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { inject } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  private sanitizer = inject(DomSanitizer);

  mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2579.246!2d26.5875!3d48.6715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472d5be2c30a9d8f%3A0x77c5a52e3b5a5a5!2z0LLRg9C70LjRhtGPINChQvC_0LHQvtGA0L3QsCwgOSwg0JrQsNC80Y_QvdC10YbRjC3QldC-0L7QstGB0LrQuNC5!5e0!3m2!1suk!2sua!4v1700000000000!5m2!1suk!2sua'
  );

  hours = [
    { day: 'Понеділок', open: '08:00', close: '22:00' },
    { day: 'Вівторок', open: '08:00', close: '22:00' },
    { day: 'Середа', open: '08:00', close: '22:00' },
    { day: 'Четвер', open: '08:00', close: '22:00' },
    { day: 'П\'ятниця', open: '08:00', close: '22:00' },
    { day: 'Субота', open: '08:00', close: '22:00' },
    { day: 'Неділя', open: '08:00', close: '22:00' },
  ];
}
