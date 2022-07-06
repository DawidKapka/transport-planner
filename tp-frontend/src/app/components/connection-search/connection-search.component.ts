import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Participant} from "../../models/participant.model";
import {ConnectionRequests} from "../../../../../shared/models/api-requests/connection-requests.model";
import {ConnectionsService} from "../../services/connections.service";
import {ConnectionsResponse} from "../../../../../shared/models/api-responses/connections-response.model";
import {TripService} from "../../services/trip.service";
import {Router} from "@angular/router";

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
  public showSpinner: boolean = false;
  public destinationError: boolean = false;

  constructor(private connectionService: ConnectionsService, private tripService: TripService, private router: Router) {
    const date = ConnectionSearchComponent.getCurrentDate();
    const dateFormatted = date.substring(0, 2) + ' - '
      + date.substring(3, 5) + ' - '
      + date.substring(6, 10) + ' : '
      + date.substring(12, 14) + ':'
      + date.substring(15, 17);
    this.datePlaceholder = dateFormatted;
  }

  private static getCurrentDate(): string {
    return new Date(Date.now()).toLocaleString('de-CH', {timeZone: 'europe/berlin', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'});
  }

  ngOnInit(): void {
    this.participants.push({id: 1, name: '', departureStation: '', nameError: false, stationError: false});
  }

  public incrementParticipants() {
    this.participants.push({id: this.participants.length +1, name: '', departureStation: '', nameError: false, stationError: false});
  }

  public findConnections() {
    if (this.validateFormFields()) {
      ConnectionSearchComponent.playLeaveAnimation();
      this.showSpinner = true;
      this.connectionService.findConnections(this.createRequest()).forEach(res => {
        this.tripService.setArrivalStation(this.station);
        this.tripService.setArrivalDate(this.arrivalDate ? this.arrivalDate : ConnectionSearchComponent.getCurrentDate())
        this.tripService.setConnections(res as ConnectionsResponse[])
        this.tripService.setParticipants(this.participants)
        this.router.navigate(['configure']);
      });
    }
  }

  private validateFormFields(): boolean {
    this.destinationError = !this.station
    const checkParticipants = this.validateParticipants();
    return !(this.destinationError || !checkParticipants);

  }

  private validateParticipants(): boolean {
    let errors = 0;
    for (let participant of this.participants) {
      participant.nameError = !participant.name;
      participant.stationError = !participant.departureStation;
      if (participant.nameError || participant.stationError) errors++;
    }
    return errors === 0;
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

  private static playLeaveAnimation() {
    document.querySelector('.form-container__main').classList.add('leave-up');
    document.querySelector('.form-container__participants').classList.add('leave-up-double');
    document.querySelector('.form-container__search').classList.add('leave-down');
  }
}
