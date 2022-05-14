import { Component, OnInit } from '@angular/core';
import {ConnectionsResponse} from "../../../../../shared/models/api-responses/connections-response.model";
import {Participant} from "../../models/participant.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public connections: ConnectionsResponse[] | null = null;
  public participants: Participant[] | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  setConnections(connections: ConnectionsResponse[]) {
    this.connections = null;
    setTimeout(() => this.connections = connections, 100);
  }

  setParticipants(participants: Participant[]) {
    this.participants = null;
    setTimeout(() => this.participants = participants, 100);
  }
}
