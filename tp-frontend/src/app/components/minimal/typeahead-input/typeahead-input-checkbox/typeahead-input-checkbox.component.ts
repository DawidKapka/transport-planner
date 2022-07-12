import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-typeahead-input-checkbox',
  templateUrl: './typeahead-input-checkbox.component.html',
  styleUrls: ['./typeahead-input-checkbox.component.scss']
})
export class TypeaheadInputCheckboxComponent implements OnInit {

  @Input('selected') isSelected: boolean = false;
  @Input('text') labelText: string = '';
  @Output('selectedChange') selected: EventEmitter<boolean> = new EventEmitter<boolean>();

  public emitSelected() {
    this.isSelected = !this.isSelected;
    this.selected.emit(this.isSelected)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
