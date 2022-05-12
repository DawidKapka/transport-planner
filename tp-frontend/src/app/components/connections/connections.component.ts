import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {
  public participantsAmount: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  public incrementParticipants() {
    this.participantsAmount++;
  }

  public searchConnections() {

  }
}
