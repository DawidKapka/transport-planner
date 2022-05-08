import {ConnectionRequestStation} from "./connection-request-station.model";
import {ConnectionRequestCoordinate} from "./connection-request-coordinate.model";

export interface ConnectionRequests {
    requests: (ConnectionRequestStation | ConnectionRequestCoordinate)[];
    targetStation: string;
    desiredTime: string;
}
