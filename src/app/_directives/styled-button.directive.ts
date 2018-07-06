import { Directive, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[appStyledButton]'
})
export class StyledButtonDirective implements AfterViewInit {
  // tslint:disable-next-line:no-input-rename
  @Input('appStyledButton') buttonType: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.el.nativeElement, 'align-items', 'center');
    const button = this.el.nativeElement.getElementsByTagName('button')[0];
    this.renderer.setStyle(button, '-webkit-appearance', 'none');
    this.renderer.setStyle(button, '-moz-appearance', 'none');
    this.renderer.setStyle(button, 'appearance', 'none');
    this.renderer.setStyle(button, 'border', '0');
    this.renderer.setStyle(button, 'border-radius', '0px');
    switch (this.buttonType) {
      case 'primary':
        this.stylePrimaryButton(button);
        break;
      case 'primary-right':
        this.stylePrimaryButton(button);
        this.addArrowRight(button);
        break;
      case 'primary-left':
        this.stylePrimaryButton(button);
        this.addArrowLeft(button);
        break;
      case 'secondary':
        this.styleSecondaryButton(button);
        break;
      case 'secondary-right':
        this.styleSecondaryButton(button);
        this.addArrowRight(button);
        break;
      case 'secondary-left':
        this.styleSecondaryButton(button);
        this.addArrowLeft(button);
        break;
      default:
        this.stylePrimaryButton(button);
        break;
    }
  }

  stylePrimaryButton(button) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#000');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#fff');
    this.renderer.setStyle(button, 'line-height', '3.75');
    this.renderer.setStyle(button, 'font-weight', '500');
    this.renderer.setStyle(button, 'text-indent', '8px');
    this.renderer.setStyle(button, 'background-color', '#000');
    this.renderer.setStyle(button, 'color', '#fff');
  }

  styleSecondaryButton(button) {
    this.renderer.setStyle(button, 'background-color', '#fff');
    this.renderer.setStyle(button, 'line-height', '3.75');
    this.renderer.setStyle(button, 'font-size', '0.9em');
    this.renderer.setStyle(button, 'font-weight', '500');
  }

  addArrowRight(button) {
    const newSpan = this.renderer.createElement('span');
    const arrowColor = this.buttonType.includes('primary') ? 'arrow-white' : 'arrow';
    this.renderer.setStyle(newSpan, 'height', '18px');
    this.renderer.setStyle(newSpan, 'width', '18px');
    this.renderer.setStyle(newSpan, 'margin-right', '12px');
    this.renderer.setStyle(newSpan, 'background', `url("/assets/icons/tools/${arrowColor}.png") no-repeat top left`);
    this.renderer.setStyle(newSpan, 'background-size', 'contain');
    this.renderer.appendChild(this.el.nativeElement, newSpan);
  }

  addArrowLeft(button) {
    const newSpan = this.renderer.createElement('span');
    const arrowColor = this.buttonType.includes('primary') ? 'arrow-white' : 'arrow';
    this.renderer.setStyle(newSpan, 'height', '18px');
    this.renderer.setStyle(newSpan, 'width', '18px');
    this.renderer.setStyle(newSpan, 'background', `url("/assets/icons/tools/${arrowColor}.png") no-repeat top left`);
    this.renderer.setStyle(newSpan, 'background-size', 'contain');
    this.renderer.appendChild(this.el.nativeElement, newSpan);
    this.renderer.setStyle(this.el.nativeElement, 'flex-direction', 'row-reverse');
  }
}
