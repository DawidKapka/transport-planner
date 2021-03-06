import {Station} from "../../../../lib/models/station/station.model";
import {Connection} from "./connection.model";


export interface Trip {
  arrivalStation: Station,
  arrivalTime: Date;
  connections: Connection[]
}
