import {Stop} from "../stop/stop.model";
import {Journey} from "../journey/journey.model";

export interface Section {
    journey: Journey;
    walk: string,
    departure: Stop;
    arrival: Stop;
}
