import {ConnectionRequestStation} from "../connection/connection-request-station.model";
import {ConnectionRequestCoordinate} from "../connection/connection-request-coordinate.model";

export interface ConnectionRequests {
    requests: (ConnectionRequestStation | ConnectionRequestCoordinate)[];
    targetStation: string;
    desiredTime: string;
}
