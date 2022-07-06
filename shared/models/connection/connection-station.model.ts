import {Station} from "../station/station.model";
import {StationLocation} from "../station/station-location.model";

export interface ConnectionStation {
    station: Station,
    arrival: Date;
    arrivalTimestamp: number;
    departure: Date;
    departureTimestamp: number;
    delay: number;
    platform: string;
    realtimeAvailability: string;
    location: StationLocation;

}
