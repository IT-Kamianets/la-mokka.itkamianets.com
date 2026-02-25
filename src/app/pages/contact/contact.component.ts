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
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d956.0!2d26.5833279!3d48.6794789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4733b90059f02fff%3A0x8e6f3dc646153b25!2sLa%20Mokka!5e0!3m2!1suk!2sua!4v1740000000000!5m2!1suk!2sua'
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
