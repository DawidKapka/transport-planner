import {ConnectionsResponse} from "../../../../shared/models/api-responses/connections-response.model";
import {Participant} from "./participant.model";

export interface Connection {
  connection: ConnectionsResponse;
  participant: Participant
}
