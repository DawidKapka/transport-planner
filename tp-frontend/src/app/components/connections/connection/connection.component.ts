import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Participant} from "../../../models/participant.model";
import {ConnectionsResponse} from "../../../../../../tp-backend/src/shared/models/api-responses/connections-response.model";
import {ConnectionsService} from "../../../services/connections.service";
import {Router} from "@angular/router";
import {TripService} from "../../../services/trip.service";

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  @Input() participant: Participant = null;
  @Input() connection: ConnectionsResponse = null;
  @Output() expand: EventEmitter<void> = new EventEmitter<void>();
  isOpened: boolean = false;
  isLoading: boolean = false;

  constructor(private connectionsService: ConnectionsService, private tripService: TripService) { }

  ngOnInit(): void {
  }

  formatTime(departure: Date) {
    return departure.toString().substring(11, 16);
  }

  formatDelay(delay: number) {
    return delay ? ` +${delay}'` : '';
  }

  formatPlatform(platform: string) {
    return platform ? `Pl. ${platform}` : '';
  }

  formatDuration(duration: string) {
    const hours = duration.substring(3, 5);
    const minutes = duration.substring(6, 8);
    let time = '';
    time += hours !== '00' ? hours + 'h ' : '';
    time += minutes !== '00' ? minutes + 'min ' : '';
    return time;
  }

  openConnection() {
    this.connectionsService.expandedConnection = this.connection;
    this.expand.emit();
  }

  getEarlierConnection() {
    this.isLoading = true;
    this.connectionsService.findEarlierConnection(this.connection).forEach(res => {
      this.connection = res as ConnectionsResponse
      this.changeConnection();
      this.isLoading = false;
    });
  }

  getLaterConnection() {
    this.isLoading = true;
    this.connectionsService.findLaterConnection(this.connection).forEach(res => {
      this.connection = res as ConnectionsResponse;
      this.changeConnection();
      this.isLoading = false;
    })
  }

  private changeConnection() {
    const connection = this.tripService.getConnections().find(connection => connection.participantId = this.connection.participantId);
    connection.connection = this.connection.connection;
  }

  getProductIcon(product: string) {
    return product;
  }
}
