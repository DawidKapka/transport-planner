import {Coordinate} from "../coordinate/coordinate.model";

export interface StationLocation {
    id: string;
    name: string;
    score: string;
    coordinate: Coordinate;
    distance: number;
}
