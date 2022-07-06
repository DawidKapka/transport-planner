import {ConnectionStation} from "./connection-station.model";
import {Section} from "../section/section.model";

export interface Connection {
    from: ConnectionStation;
    to: ConnectionStation;
    duration: string;
    transfers: number;
    service?: string;
    products: string[],
    capacity1st?: string;
    capacity2nd?: string;
    sections: Section[]
}
