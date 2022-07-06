import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-typeahead-input-datetime',
  templateUrl: './typeahead-input-datetime.component.html',
  styleUrls: ['./typeahead-input-datetime.component.scss']
})
export class TypeaheadInputDatetimeComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input('value') text: string = '';
  @Input('error') error: boolean = false;

  @Output('valueChange') valueChange: EventEmitter<string> = new EventEmitter<string>();

  emitValueChange() {
    this.valueChange.emit(this.text);
  }

  onValueChange() {
    this.formatDate();
    this.emitValueChange();
  }

  private formatDate() {
    let date = '';
    let days = this.text.substring(0, 2) ? this.text.substring(0, 2) : '';
    if (Number(days[0]) > 3) days = '0' + days;
    date += days;
    if (days.length === 2) date += ' - ';

    let months = this.text.substring(5, 7) ? this.text.substring(5, 7) : '';
    if (Number(months[0]) > 1) months = '0' + months;
    date += months;
    if (months.length === 2) date += ' - 202';

    let year = this.text.substring(13, 14) ? this.text.substring(13, 14) : '';
    date += year;
    if (year.length === 1) date += ' : '

    let hours = this.text.substring(17, 19) ? this.text.substring(17, 19) : '';
    if (Number(hours[0]) > 2) hours = '0' + hours;
    date += hours;
    if (hours.length === 2) date += ':';

    let minutes = this.text.substring(20, 22) ? this.text.substring(20, 22) : '';
    if (Number(minutes[0]) > 5) minutes = '0' + minutes;
    date += minutes;

    this.text = date;
  }

  ngOnInit(): void {
  }

}
