import {Component, Input, OnInit} from '@angular/core';
import {Participant} from "../../../models/participant.model";
import {ConnectionsResponse} from "../../../../../../tp-backend/src/shared/models/api-responses/connections-response.model";

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  @Input() participant: Participant = null;
  @Input() connection: ConnectionsResponse = null;
  isOpened: boolean = false;

  constructor() { }

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
    this.isOpened = !this.isOpened;
  }
}