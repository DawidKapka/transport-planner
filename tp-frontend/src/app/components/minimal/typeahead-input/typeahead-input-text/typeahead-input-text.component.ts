import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-typeahead-input-text',
  templateUrl: './typeahead-input-text.component.html',
  styleUrls: ['./typeahead-input-text.component.scss']
})
export class TypeaheadInputTextComponent implements OnInit {
  public currentValue: string = '';

  @Input() placeholder: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
