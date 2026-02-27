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
    // Заклад
    { id: 51, src: '/interior-1.jpg', alt: 'Зал кафе — логотип La Mokka',          category: 'interior' },
    { id: 52, src: '/interior-2.jpg', alt: 'Затишний зал з оксамитовими диванами', category: 'interior' },
    { id: 53, src: '/interior-3.jpg', alt: 'Вечірній зал з підсвіченим логотипом', category: 'interior' },
    { id: 54, src: '/interior-4.jpg', alt: 'Фірмова кава La Mokka',                category: 'interior' },
    // Сніданки
    { id: 1,  src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/Preenzw-aqcySWP-YGybFlP.jpeg',         alt: 'Мюнхенський сніданок',                   category: 'food' },
    { id: 2,  src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/LRYIdCZ-IbDKtyL-hGCcoeC_prepare.jpeg', alt: 'Авокадо тост з лососем',                  category: 'food' },
    { id: 3,  src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/uHOHGbt-tnJHvCg-NsAiIbe_prepare.jpeg', alt: 'Скрембл з лососем',                        category: 'food' },
    { id: 4,  src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/zKsKMHY-JOfXMnA-DSGHRdf.jpeg',         alt: 'Англійський сніданок',                   category: 'food' },
    { id: 5,  src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/XmfQSlM-nIVyATH-VdIHoan_prepare.jpeg', alt: 'Авокадо тост з креветками',               category: 'food' },
    { id: 6,  src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/YaywceJ-sbBDqfS-OmcIWWW.jpeg',         alt: 'Шакшука',                                category: 'food' },
    { id: 7,  src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/FhxRYoj-eMUJhdz-lKLdefl.jpeg',         alt: 'Омлет з сиром та куркою',                category: 'food' },
    { id: 8,  src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/FlZCRDl-dbWwjLF-nuGebBO_prepare.jpeg', alt: 'Шакшука м\'ясна',                          category: 'food' },
    { id: 9,  src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/cDpBNeJ-DQHZbKE-HbTtooF.jpeg',         alt: 'Крок Мадам',                             category: 'food' },
    { id: 10, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/jZlbiFd-fFYkAcY-SUOLjKW_prepare.jpeg', alt: 'Круасан Бенедикт',                        category: 'food' },
    { id: 11, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/DSEhnbU-YSEYDNC-DYoIHaH.jpeg',         alt: 'Вівсяна каша з ягодами',                 category: 'food' },
    { id: 12, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/fcIKAbv-geMzeCw-CQCGOee_prepare.jpeg', alt: 'Скрембл з куркою',                        category: 'food' },
    { id: 13, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/jYNDTbu-EjwJXHW-FjUsdGL_prepare.jpeg', alt: 'Скрембл з сосисками',                     category: 'food' },
    { id: 14, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/lkfJFne-JmopajF-mwDebJI_prepare.jpeg', alt: 'Французький тост з персиком',             category: 'food' },
    // Основне меню
    { id: 15, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/IkzOIbe-cOOHKDb-HRcxPqd.jpeg',         alt: 'Паста Карбонара',                        category: 'food' },
    { id: 16, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/HVUcsJQ-KQryVHm-JdFnDej.jpeg',         alt: 'Паста з телятиною і білими грибами',      category: 'food' },
    { id: 17, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/PztIAMU-cgLHaJx-vSReFlJ.jpeg',         alt: 'Паста з лососем і соусом Біск',          category: 'food' },
    { id: 18, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/LhAfOGK-JDlfpyZ-pmvFvln_prepare.jpeg', alt: 'Паста Болоньєзе',                         category: 'food' },
    { id: 19, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/TlFhFrI-eeZXHIW-PcDnOlB.jpeg',         alt: 'Бургер Brooklyn Bacon',                  category: 'food' },
    { id: 20, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/HPIjDTD-ukcrSDj-qMYxDxY.jpeg',         alt: 'Бургер New Yorker',                      category: 'food' },
    { id: 21, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/lQNgjFP-NaLBnSA-eMPROyP.jpeg',         alt: 'Бургер Pastrami',                        category: 'food' },
    { id: 22, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/QbDHXGk-UxUuBge-FfaHVSe_prepare.jpeg', alt: 'Цезар з креветкою',                      category: 'food' },
    { id: 23, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/FFJITrq-GXIphLj-IXEtzDH.jpeg',         alt: 'Салат Цезар',                            category: 'food' },
    { id: 24, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/DIObJQH-VrnStAw-PUFijBI_prepare.jpeg', alt: 'Салат з лососем і авокадо',               category: 'food' },
    { id: 25, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/fywilIt-EhmtYCb-IqzOfwH.jpeg',         alt: 'Теплий салат з телятиною і фетою',        category: 'food' },
    { id: 26, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/FlGYFAe-ueburgL-hqGvkRn.jpeg',         alt: 'Стейк Стріплоін з бататом',              category: 'food' },
    { id: 27, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/hOKQTYz-IJlDlGm-secDGHQ_prepare.jpeg', alt: 'Філе лосося з пюре і броколі',            category: 'food' },
    { id: 28, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/FDQHmlH-gwiKXDC-GjaYVGh_prepare.jpeg', alt: 'Медальйони зі свинини з грибним соусом', category: 'food' },
    { id: 29, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/GwrEDvb-zHDDICH-CCncUQV.jpeg',         alt: 'Норвезький суп з лососем',               category: 'food' },
    { id: 30, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/OtFreDN-ttOJARF-LbIlCni_prepare.jpeg', alt: 'Крем-суп з гарбуза з беконом',           category: 'food' },
    { id: 31, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/clDEgHW-dlVCySe-hlCQHbg.jpeg',         alt: 'Сирники з ягідним соусом',               category: 'food' },
    { id: 32, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/RQQGFlR-HiMlbxd-iqzoqhF.jpeg',         alt: 'Сирники у ванільному соусі',             category: 'food' },
    { id: 33, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/aCbKmCa-IXxiRMn-DCJEwue.jpeg',         alt: 'Млинці з апельсиновою карамеллю',        category: 'food' },
    { id: 34, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/WCCSBsn-BaFdduA-WfXeSjk.jpeg',         alt: 'Креветки фрі з гостро-солодким соусом',  category: 'food' },
    { id: 35, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/OHwclsm-mCCDzml-YtwDDfZ.jpeg',         alt: 'Деруни з грибним соусом',               category: 'food' },
    { id: 36, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/liKcIZx-bkzCGGM-KcHbiFK.jpeg',         alt: 'Овочі гриль',                            category: 'food' },
    // Напої
    { id: 37, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/lkPGXti-JGetGGo-bgbYvuh.jpeg',         alt: 'Айс лате',                               category: 'drinks' },
    { id: 38, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/vbFGdQW-CvDFMqE-thbOdqg.jpeg',         alt: 'Айс Раф',                                category: 'drinks' },
    { id: 39, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/zkCrHkP-LdQAJeB-fHRNGVk.jpeg',         alt: 'Айс капучино',                           category: 'drinks' },
    { id: 40, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/QkXyRGL-eJfbyYK-NDySvSP.jpeg',         alt: 'Шторм',                                  category: 'drinks' },
    { id: 41, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/sNsQKfC-BRmExyL-CMIYJpg.jpeg',         alt: 'Еспресо тонік',                          category: 'drinks' },
    { id: 42, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/FloQMbP-JAeIsQq-tCjkoZL.jpeg',         alt: 'Мілкшейк',                               category: 'drinks' },
    { id: 43, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/HesYaNm-npnEJgA-GLCckLb.jpeg',         alt: 'Бабл-лате',                              category: 'drinks' },
    { id: 44, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/FSoPInj-sbMkHzR-uyBPlMQ.jpeg',         alt: 'Бабл-ті',                                category: 'drinks' },
    { id: 45, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/JoXCkDu-eojNMXN-uIgDZqK.jpeg',         alt: 'Мохіто',                                 category: 'drinks' },
    { id: 46, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/uOGIvIN-vrHbaeG-DPUXcCp.jpeg',         alt: 'Банановий лимонад',                      category: 'drinks' },
    { id: 47, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/HDtKDuV-ehJYYmQ-lLuhAhG.jpeg',         alt: 'Матча оранж',                            category: 'drinks' },
    { id: 48, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/iwuqCIb-XsuadhZ-xcudYra.jpeg',         alt: 'Айс какао',                              category: 'drinks' },
    { id: 49, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/gLzWHrl-Yehapdk-OUnJepD.jpeg',         alt: 'Фрапе',                                  category: 'drinks' },
    { id: 50, src: 'https://cdn-media.choiceqr.com/prod-eat-la-mokka/menu/kBaVdaq-xJkEflg-ByzDwCh.jpeg',         alt: 'Джміль',                                 category: 'drinks' },
  ];

  constructor() {
    for (let i = this.images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.images[i], this.images[j]] = [this.images[j], this.images[i]];
    }
  }

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
