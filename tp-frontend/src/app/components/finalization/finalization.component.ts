import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TripService} from "../../services/trip.service";
import * as uuid from 'uuid';
import {HttpClient} from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {Trip} from "@lib/models/trip/trip.model";


@Component({
  selector: 'app-finalization',
  templateUrl: './finalization.component.html',
  styleUrls: ['./finalization.component.scss']
})
export class FinalizationComponent implements OnInit {
  @ViewChild('link') private link: ElementRef;
  public copyText: string = 'Copy Link'

  constructor(private tripService: TripService) {
    this.createTripId();
  }

  ngOnInit(): void {
  }

  private createTripId() {
    if (!this.tripService.getTripId()) {
      this.tripService.setTripId(uuid.v4());
    }
    this.tripService.saveTrip()
  }

  getTripUrl() {
    return `${environment.appUrl}/trip/${this.tripService.getTripId()}`;
  }

  copyLinkToClipboard() {
    (this.link.nativeElement as HTMLElement).classList.add('copied')
    this.copyText = 'Copied!'
    setTimeout(() => {
      (this.link.nativeElement as HTMLElement).classList.remove('copied');
      this.copyText = 'Copy Link';
    }, 2000);
    navigator.clipboard.writeText(this.getTripUrl())
  }
}
