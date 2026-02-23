import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  lightboxOpen = signal(false);
  activeImage = signal<GalleryImage | null>(null);

  images: GalleryImage[] = [
    { id: 1, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/Preenzw-aqcySWP-YGybFlP.jpeg', alt: 'Мюнхенський сніданок', category: 'food' },
    { id: 2, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/LRYIdCZ-IbDKtyL-hGCcoeC_prepare.jpeg', alt: 'Авокадо тост з лососем', category: 'food' },
    { id: 3, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/uHOHGbt-tnJHvCg-NsAiIbe_prepare.jpeg', alt: 'Скрембл з лососем', category: 'food' },
    { id: 4, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/zKsKMHY-JOfXMnA-DSGHRdf.jpeg', alt: 'Англійський сніданок', category: 'food' },
    { id: 5, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/XmfQSlM-nIVyATH-VdIHoan_prepare.jpeg', alt: 'Авокадо тост з креветками', category: 'food' },
    { id: 6, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/YaywceJ-sbBDqfS-OmcIWWW.jpeg', alt: 'Шакшука', category: 'food' },
    { id: 7, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/FhxRYoj-eMUJhdz-lKLdefl.jpeg', alt: 'Омлет з сиром та куркою', category: 'food' },
    { id: 8, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/FlZCRDl-dbWwjLF-nuGebBO_prepare.jpeg', alt: 'Шакшука м\'ясна', category: 'food' },
    { id: 9, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/cDpBNeJ-DQHZbKE-HbTtooF.jpeg', alt: 'Крок Мадам', category: 'food' },
    { id: 10, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/jZlbiFd-fFYkAcY-SUOLjKW_prepare.jpeg', alt: 'Круасан Бенедикт', category: 'food' },
    { id: 11, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/DSEhnbU-YSEYDNC-DYoIHaH.jpeg', alt: 'Вівсяна каша з ягодами', category: 'food' },
    { id: 12, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/BHARmqv-PynIQeM-xHABceL.jpeg', alt: 'Вівсянка з пармезаном', category: 'food' },
    { id: 13, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/fcIKAbv-geMzeCw-CQCGOee_prepare.jpeg', alt: 'Скрембл з куркою', category: 'food' },
    { id: 14, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/jYNDTbu-EjwJXHW-FjUsdGL_prepare.jpeg', alt: 'Скрембл з сосисками', category: 'food' },
  ];

  openLightbox(image: GalleryImage) {
    this.activeImage.set(image);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxOpen.set(false);
    this.activeImage.set(null);
    document.body.style.overflow = '';
  }

  navigate(direction: 'prev' | 'next') {
    const current = this.activeImage();
    if (!current) return;
    const idx = this.images.findIndex(i => i.id === current.id);
    const next = direction === 'next'
      ? this.images[(idx + 1) % this.images.length]
      : this.images[(idx - 1 + this.images.length) % this.images.length];
    this.activeImage.set(next);
  }
}
