import {ConnectionStation} from "./connection-station.model";

export interface Connection {
    from: ConnectionStation;
    to: ConnectionStation;
    duration: string;
    transfers: number;
    service?: string;
    products: string[],
    capacity1st?: string;
    capacity2nd?: string;
}
