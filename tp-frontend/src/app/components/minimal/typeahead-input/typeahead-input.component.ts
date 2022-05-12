import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-typeahead-input',
  templateUrl: './typeahead-input.component.html',
  styleUrls: ['./typeahead-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TypeaheadInputComponent{
  @Input() type: 'station-search' | 'date-time' | 'button' | 'text' | undefined;
  @Input() placeholder: string = '';
  @Input() text: string = '';

  @Output('on-click') click = new EventEmitter();

  constructor() {
  }

  public emitClick() {
    this.click.emit();
  }

}

