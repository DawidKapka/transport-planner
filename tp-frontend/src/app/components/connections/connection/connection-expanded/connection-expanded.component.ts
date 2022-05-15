import {Component, Input, OnInit} from '@angular/core';
import {ConnectionsResponse} from "../../../../../../../tp-backend/src/shared/models/api-responses/connections-response.model";

@Component({
  selector: 'app-connection-expanded',
  templateUrl: './connection-expanded.component.html',
  styleUrls: ['./connection-expanded.component.scss']
})
export class ConnectionExpandedComponent implements OnInit {

  @Input() connection: ConnectionsResponse;
  isExpanded: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.connection.connection.sections);
  }

  formatTime(time: string) {
    return time.substring(11, 16);
  }

  formatDelay(delay: number) {
    return delay ? `+${delay}'` : '';
  }

  formatPlatform(platform: string) {
    return platform ? `Pl. ${platform}` : '';
  }

  toggleExpanded() {
    this.isExpanded =  !this.isExpanded
  }
}

