import {Station} from "../station/station.model";

export interface Stop {
    station: Station;
    arrival: string;
    departure: string;
    delay: number;
    platform: string;
}
