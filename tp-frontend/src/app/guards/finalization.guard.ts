import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {TripService} from "../services/trip.service";

@Injectable({
  providedIn: 'root'
})
export class FinalizationGuard implements CanActivate{

  constructor(private tripService: TripService, private router: Router) {}

  canActivate() {
    if (this.tripService.getTrip()) {
      return true;
    }  else {
      this.router.navigate(['create']);
      return false;
    }
  }
}
