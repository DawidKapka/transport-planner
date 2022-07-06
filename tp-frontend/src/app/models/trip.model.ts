import {Station} from "../../../../tp-backend/src/shared/models/station/station.model";
import {Connection} from "./connection.model";


export interface Trip {
  arrivalStation: Station,
  arrivalTime: Date;
  connections: Connection[]
}
