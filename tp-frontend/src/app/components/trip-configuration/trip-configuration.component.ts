import { Component, OnInit } from '@angular/core';
import {TripService} from "../../services/trip.service";
import {Participant} from "../../models/participant.model";
import {ConnectionsResponse} from "../../../../../tp-backend/src/shared/models/api-responses/connections-response.model";
import {Station} from "../../../../../tp-backend/src/shared/models/station/station.model";
import {Router} from "@angular/router";
import {Trip} from "../../models/trip.model";
import {ConnectionsService} from "../../services/connections.service";

@Component({
  selector: 'app-trip-configuration',
  templateUrl: './trip-configuration.component.html',
  styleUrls: ['./trip-configuration.component.scss']
})
export class TripConfigurationComponent implements OnInit {
  public connections: ConnectionsResponse[];
  public participants: Participant[];

  constructor(private tripService: TripService, private router: Router, private connectionsService: ConnectionsService) {
    this.connections = tripService.getConnections();
    this.participants = tripService.getParticipants();
  }

  ngOnInit(): void {
  }

  navigateToConnection() {
    TripConfigurationComponent.playLeaveAnimation();
    setTimeout(() => this.router.navigate(['connection-detail']), 500)
  }

  private static playLeaveAnimation() {
    document.querySelector('.connections').classList.add('leave-up');
    document.querySelector('.continue').classList.add('leave-down');
  }

  continue() {
    this.connectionsService.getStations(this.tripService.getArrivalStation()).forEach(stations => {
      this.tripService.createTrip(((stations as any).stations as Station[])[0]);
      TripConfigurationComponent.playLeaveAnimation();
      setTimeout(() => this.router.navigate(['finalize']), 500)
    })
  }
}
