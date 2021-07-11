import {
  Directive,
  OnInit,
  Input,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: '[myFor]',
})
export class ForDirective implements OnInit {
  @Input('myForEm') numbers!: number[];

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}

  ngOnInit(): void {

    for (let n of this.numbers) {
      this.container.createEmbeddedView(this.template, { $implict: n });
    }

    console.log(this.numbers);
  }
}
