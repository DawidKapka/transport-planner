import { Component, OnInit } from '@angular/core';
import {TripService} from "../../services/trip.service";
import * as uuid from 'uuid';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-finalization',
  templateUrl: './finalization.component.html',
  styleUrls: ['./finalization.component.scss']
})
export class FinalizationComponent implements OnInit {

  constructor(private tripService: TripService, private http: HttpClient) {
    this.createTripId();
    this.getQrCode();
  }

  ngOnInit(): void {
  }

  private createTripId() {
    this.tripService.setTripId(uuid.v4());
    console.log(this.tripService.getTripId());
  }

  public getQrCode() {
    console.log(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.tripService.getTripId()}`)
    this.http.get(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.tripService.getTripId()}`).forEach(res => {
      console.log(res);
    })
  }

}
