import {Injectable} from "@angular/core";
import {Participant} from "../models/participant.model";
import {ConnectionsResponse} from "../../../../tp-backend/src/shared/models/api-responses/connections-response.model";
import {Station} from "../../../../tp-backend/src/shared/models/station/station.model";
import {Trip} from "../models/trip.model";
import {ConnectionsService} from "./connections.service";
import {Connection} from "../models/connection.model";

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private connections: ConnectionsResponse[];
  private participants: Participant[];
  private arrivalStation: string;
  private arrivalDate: Date;
  private trip: Trip;
  private tripId: string;

  constructor() {
  }


  setConnections(connections: ConnectionsResponse[]) {
    this.connections = connections;
  }

  setParticipants(participants: Participant[]) {
    this.participants = participants;
  }

  getConnections(): ConnectionsResponse[] {
    return this.connections;
  }

  getParticipants(): Participant[] {
    return this.participants
  }

  setArrivalStation(station: string) {
    this.arrivalStation = station;
  }

  getArrivalStation(): string {
    return this.arrivalStation;
  }

  setArrivalDate(date: string) {
    this.arrivalDate = new Date(Date.parse(`${date.substring(6, 10)}-${date.substring(3, 5)}-${date.substring(0, 2)}T${date.substring(12, 17)}:00`))
  }

  getArrivalDate(): Date {
    return this.arrivalDate;
  }

  createTrip(arrivalStation: Station): void {
    const connections: Connection[] = [];
    this.connections.forEach(connection => {
      connections.push({
        connection: connection,
        participant: this.participants.find(participant => participant.id === connection.participantId)
      })
    })
    this.trip = {
      arrivalStation: arrivalStation,
      arrivalTime: this.arrivalDate,
      connections: connections
    }
  }

  getTrip(): Trip {
    return this.trip;
  }

  setTripId(id: string) {
    this.tripId = id;
  }

  getTripId(): string {
    return this.tripId;
  }
}

