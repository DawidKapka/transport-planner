import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-typeahead-input-button',
  templateUrl: './typeahead-input-button.component.html',
  styleUrls: ['./typeahead-input-button.component.scss']
})
export class TypeaheadInputButtonComponent implements OnInit {
  @Input() text: string = '';

  @Output('on-click') click = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public emitClick() {
    this.click.emit();
  }

}
