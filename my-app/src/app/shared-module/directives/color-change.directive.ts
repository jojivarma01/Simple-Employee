import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColorChange]'
})
export class ColorChangeDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseover')
  onMouseenter() {
    this.renderer.addClass(this.element.nativeElement, 'text-success');
  }

  @HostListener('mouseout')
  onMouseleave() {
   this.renderer.removeClass(this.element.nativeElement, 'text-success');
  }

}
