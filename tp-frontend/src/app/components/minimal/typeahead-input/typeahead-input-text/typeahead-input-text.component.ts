import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-typeahead-input-text',
  templateUrl: './typeahead-input-text.component.html',
  styleUrls: ['./typeahead-input-text.component.scss']
})
export class TypeaheadInputTextComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input('value') currentValue: string = '';
  @Input('error') error: boolean = false;
  @Output('valueChange') valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  emitValueChange() {
    this.valueChange.emit(this.currentValue);
  }

}
