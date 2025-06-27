import { Component } from '@angular/core';
import { SliderComponent } from './slider/slider.component';
import { Slide } from '../../../models/slide';

@Component({
  selector: 'app-media',
  imports: [SliderComponent],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent {
  slideItems: Slide[] = [
    {
      slideId: 1, slideLabel: "Titre 1", slideImg: "assets/images/p-2025-06-08-IFC.jpg", slideAlt: "media 1"
    },
    {
      slideId: 2, slideLabel: "Titre 2", slideImg: "assets/images/p-2025-05-19-IFC.jpg", slideAlt: "media 2"
    },
    {
      slideId: 3, slideLabel: "Titre 3", slideImg: "assets/images/p-2025-04-09-IFC.jpg", slideAlt: "media 3"
    }
  ]
}
