import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConnectionRequests} from "../../../../lib/models/api-requests/connection-requests.model";
import {ConnectionRequestStation} from "../../../../lib/models/connection/connection-request-station.model";
import {ConnectionsResponse} from "../../../../lib/models/api-responses/connections-response.model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class ConnectionsService {
  private API_BASE_URL: string = 'http://localhost:3000';
  public expandedConnection: ConnectionsResponse;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getStations(query: string) {
    console.log(this.authService.getAccessToken());
    return this.http.get(
      `${this.API_BASE_URL}/stations/find/${query.replace('/', '%2F')}`,
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.authService.getAccessToken()}`})})
  }

  findConnections(req: ConnectionRequests) {
    req.requests.forEach(request => (request as ConnectionRequestStation).stationName = (request as ConnectionRequestStation).stationName.replace(' ', '%20'));
    return this.http.post(`${this.API_BASE_URL}/connections/find`, req,
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.authService.getAccessToken()}`})});
  }

  findEarlierConnection(connection: ConnectionsResponse) {
    return this.http.post(`${this.API_BASE_URL}/connections/earlier`, connection,
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.authService.getAccessToken()}`})})
  }

  findLaterConnection(connection: ConnectionsResponse) {
    return this.http.post(`${this.API_BASE_URL}/connections/later`, connection,
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.authService.getAccessToken()}`})});
  }
}
