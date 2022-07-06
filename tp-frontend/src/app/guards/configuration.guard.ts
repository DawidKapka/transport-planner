import {Injectable} from "@angular/core";
import {CanActivate, CanLoad, Router} from "@angular/router";
import {TripService} from "../services/trip.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationGuard implements CanActivate{

  constructor(private tripService: TripService, private router: Router) {}

  canActivate() {
    if (this.tripService.getConnections() && this.tripService.getParticipants()) {
      return true;
    }  else {
      this.router.navigate(['create']);
      return false;
    }
  }
}
