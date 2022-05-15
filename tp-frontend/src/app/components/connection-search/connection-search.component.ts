import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Participant} from "../../models/participant.model";
import {ConnectionRequests} from "../../../../../tp-backend/src/shared/models/api-requests/connection-requests.model";
import {ConnectionsService} from "../../services/connections.service";
import {ConnectionsResponse} from "../../../../../tp-backend/src/shared/models/api-responses/connections-response.model";

@Component({
  selector: 'app-connection-search',
  templateUrl: './connection-search.component.html',
  styleUrls: ['./connection-search.component.scss']
})
export class ConnectionSearchComponent implements OnInit {
  public participants: Participant[] = [];
  public station: string = '';
  public arrivalDate: string = '';
  public datePlaceholder: string = '';

  @Output('connections') connections: EventEmitter<ConnectionsResponse[]> = new EventEmitter<ConnectionsResponse[]>();
  @Output('participants') participantsEmitter: EventEmitter<Participant[]> = new EventEmitter<Participant[]>();

  constructor(private connectionService: ConnectionsService) {
    const date = new Date(Date.now()).toLocaleString('de-CH', {timeZone: 'europe/berlin', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'});
    const dateFormatted = date.substring(0, 2) + ' - '
      + date.substring(3, 5) + ' - '
      + date.substring(6, 10) + ' : '
      + date.substring(12, 14) + ':'
      + date.substring(15, 17);
    this.datePlaceholder = dateFormatted;
  }

  ngOnInit(): void {
    this.participants.push({id: 1, name: '', departureStation: ''});
  }

  public incrementParticipants() {
    this.participants.push({id: this.participants.length +1, name: '', departureStation: ''});
  }

  public findConnections() {
    this.connectionService.findConnections(this.createRequest()).forEach(res => {
      this.connections.emit(res as ConnectionsResponse[]);
      this.participantsEmitter.emit(this.participants);
    });


  }

  private createRequest() {
    const req =  {
      requests: [],
      targetStation: this.station,
      desiredTime: this.formatArrivalTime(this.arrivalDate ? this.arrivalDate : this.datePlaceholder)
    } as ConnectionRequests;
    this.participants.forEach(participant => {
      req.requests.push({participantId: participant.id, stationName: participant.departureStation})
    })
    return req;
  }

  private formatArrivalTime(date: string): string {
    let dateFormatted = ''
    for (let char of date) {
      if (char === ' ') char = '';
      dateFormatted += char;
    }
    const dateDate = dateFormatted.substring(6, 10) + '-' + dateFormatted.substring(3, 5) + '-' + dateFormatted.substring(0, 2);
    const dateTime = dateFormatted.substring(11, dateFormatted.length);
    return dateDate + 'T' + dateTime;
  }

  deleteParticipant(id: number) {
    this.participants = this.participants.length > 1
      ? this.participants.filter(participant => participant.id !== id)
      : this.participants;
  }
}
