import {Connection} from "../connection/connection.model";

export interface ConnectionsResponse {
    participantId: number,
    connection: Connection
}
