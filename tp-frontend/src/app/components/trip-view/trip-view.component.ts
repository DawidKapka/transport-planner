import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {TripService} from "../../services/trip.service";
import {Trip} from "@lib/models/trip/trip.model";

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss']
})
export class TripViewComponent implements OnInit {
  public trip: Trip;

  constructor(private route: ActivatedRoute, public tripService: TripService) {
  }

  ngOnInit(): void {
    this.fetchTrip();
  }

  public fetchTrip() {
     this.route.paramMap.subscribe( (params: ParamMap) => {
       this.tripService.fetchTripById(params.get('id')).then(trip => {
         this.tripService.setTrip((trip as any).trip[0]);
        this.trip = (trip as any).trip[0];
      });
    })
  }
}
