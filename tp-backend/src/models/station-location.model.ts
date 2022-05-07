import {Coordinate} from "./coordinate.model";

export interface StationLocation {
    id: string;
    name: string;
    score: string;
    coordinate: Coordinate;
    distance: number;
}
