import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ConnectionRequests} from "../../../../tp-backend/src/shared/models/api-requests/connection-requests.model";
import {ConnectionRequestStation} from "../../../../tp-backend/src/shared/models/connection/connection-request-station.model";
import {ConnectionsResponse} from "../../../../tp-backend/src/shared/models/api-responses/connections-response.model";

@Injectable({
  providedIn: "root"
})
export class ConnectionsService {
  private API_BASE_URL: string = 'http://localhost:3000';
  public expandedConnection: ConnectionsResponse;

  constructor(private http: HttpClient) {
  }

  getStations(query: string) {
    return this.http.get(`${this.API_BASE_URL}/stations/find/${query.replace('/', '%2F')}`)
  }

  findConnections(req: ConnectionRequests) {
    req.requests.forEach(request => (request as ConnectionRequestStation).stationName = (request as ConnectionRequestStation).stationName.replace(' ', '%20'));
    return this.http.post(`${this.API_BASE_URL}/connections/find`, req);
  }

  findEarlierConnection(connection: ConnectionsResponse) {
    return this.http.post(`${this.API_BASE_URL}/connections/earlier`, connection)
  }

  findLaterConnection(connection: ConnectionsResponse) {
    return this.http.post(`${this.API_BASE_URL}/connections/later`, connection);
  }
}
