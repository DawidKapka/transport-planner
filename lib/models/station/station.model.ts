export interface Station {
    id: string;
    name: string;
    score: string;
    coordinate: {
        type: string;
        x: number;
        y: number;
    };
    distance: number;
    icon: string;
}
