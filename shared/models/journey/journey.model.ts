import {Stop} from "../stop/stop.model";

export interface Journey {
    name: string;
    category: string;
    categoryCode: number;
    number: number;
    operator: string;
    to: string;
    passList: Stop[];
    capacity1st: number;
    capacity2nd: number;
}
