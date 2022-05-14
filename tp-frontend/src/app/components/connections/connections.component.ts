import {Component, Input, OnInit} from '@angular/core';
import {ConnectionsResponse} from "../../../../../shared/models/api-responses/connections-response.model";
import {Participant} from "../../models/participant.model";

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {

  @Input() connections: ConnectionsResponse[];
  @Input() participants: Participant[];
  connectionsWithParticipants: {connection: ConnectionsResponse, participant: Participant}[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.participants.forEach(participant => this.connectionsWithParticipants.push({participant: participant, connection: this.connections.find(connection => connection.participantId === participant.id)}));
  }
}
