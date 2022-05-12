import { Component, OnInit } from '@angular/core';
import {Participant} from "../../models/participant.model";

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {
  public participants: Participant[] = [];

  constructor() { }

  ngOnInit(): void {
    this.participants.push({id: 1, name: '', departureStation: ''});
  }

  public incrementParticipants() {
    this.participants.push({id: this.participants.length +1, name: '', departureStation: ''});
  }

  public findConnections() {

  }

  deleteParticipant(id: number) {
    this.participants = this.participants.length > 1
      ? this.participants.filter(participant => participant.id !== id)
      : this.participants;
  }
}
