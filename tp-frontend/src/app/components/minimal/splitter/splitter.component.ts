import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-splitter',
  templateUrl: './splitter.component.html',
  styleUrls: ['./splitter.component.scss']
})
export class SplitterComponent implements OnInit {

  @Input() size: 'small' | 'large' = 'small';

  constructor() { }

  ngOnInit(): void {
  }

}
