import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {ButtonSize, ButtonColor} from '../../../types/types'

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
  @Input('station-value') stationText: string = '';
  @Input('date-value') dateValue: string = '';
  @Input() size: ButtonSize;
  @Input() color: ButtonColor;
  @Input('small') isSmall: boolean = false;

  @Output('on-click') click = new EventEmitter();
  @Output('station-valueChange') stationValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output('date-valueChange') dateValueChange: EventEmitter<string> = new EventEmitter<string>();


  emitStationChange(value: string) {
    this.stationText = value;
    this.stationValueChange.emit(this.stationText);
  }

  emitDateChange(value: string) {
    this.dateValue = value;
    this.dateValueChange.emit(this.dateValue);
  }

  constructor() {
  }

  public emitClick() {
    this.click.emit();
  }

}

