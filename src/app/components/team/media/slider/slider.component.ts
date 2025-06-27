import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Slide } from '../../../../models/slide';

@Component({
  selector: 'app-slider',
  imports: [NgClass],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @Input() slides!: Slide[];

  selectedIndex: number = 0;

  toPrev(id: number) {
    if(this.selectedIndex > 0) {
      this.selectedIndex = id - 1;
    }
  }
  toNext(id: number) {
    if(this.selectedIndex <= this.slides?.length - 1) {
      this.selectedIndex = id + 1;
    }
  }
}
