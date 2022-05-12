import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-typeahead-input-datetime',
  templateUrl: './typeahead-input-datetime.component.html',
  styleUrls: ['./typeahead-input-datetime.component.scss']
})
export class TypeaheadInputDatetimeComponent implements OnInit {
  @Input() placeholder: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
