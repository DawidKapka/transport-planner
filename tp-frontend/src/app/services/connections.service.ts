import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ConnectionsService {
  private API_BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getStations(query: string) {
    return this.http.get(`${this.API_BASE_URL}/stations/find/${query.replace('/', '%2F')}`)
  }
}
