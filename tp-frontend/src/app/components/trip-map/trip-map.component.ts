import {Component, Input, OnInit} from '@angular/core';
import {TripService} from "../../services/trip.service";
import {Trip} from "@lib/models/trip/trip.model";
import {default as styles} from './mapConfig.json';
import MapTypeStyle = google.maps.MapTypeStyle;

@Component({
  selector: 'app-trip-map',
  templateUrl: './trip-map.component.html',
  styleUrls: ['./trip-map.component.scss']
})
export class TripMapComponent implements OnInit {
  private trip: Trip;
  public styles = styles as MapTypeStyle[];
  public stationMarkers: {lat: number, lng: number; label: string}[] = [];
  public lat = 0;
  public lng = 0;

  constructor(private tripService: TripService) {
  }

  ngOnInit(): void {
    this.trip = this.tripService.getTrip();
    this.lat = this.trip.arrivalStation.coordinate.x;
    this.lng = this.trip.arrivalStation.coordinate.y;
    this.stationMarkers = this.createStationMarkers();
  }

  private createStationMarkers(): {lat: number, lng: number; label: string}[] {
    const markers: {lat: number, lng: number; label: string}[] = [];
    this.trip.connections.forEach(connection => {
      markers.push({
        lat: connection.connection.connection.from.station.coordinate.x,
        lng: connection.connection.connection.from.station.coordinate.y,
        label: connection.participant.name
      })
    })
    return markers;
  }
}
