import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {ConnectionRequests} from "../models/connection-requests.model";
import {ConnectionRequestStation} from "../models/connection-request-station.model";
import {ConnectionRequestCoordinate} from "../models/connection-request-coordinate.model";
import {HttpService} from "@nestjs/axios";

import {Station} from "../models/station.model";
import {Connections} from "../models/connections.model";
import {Connection} from "mongoose";

@Controller('connections')
export class ConnectionsController {

    constructor(private httpService: HttpService) {}


    @Post('find')
    public async findAllConnections(@Body() req: ConnectionRequests, @Res() response) {
        const departureStations: string[] = await this.getDepartureStations(req.requests);
        const connections: Connection[] = [];
        departureStations.forEach(station => {
            this.getConnection(station, req.targetStation).then(res => {
                connections.push((res as Connections).connections[0]);
                if (connections.length === departureStations.length) {
                    response.send(connections);
                }
            })
        })

    }

    private getConnection(departureStation: string, targetStation: string) {
        return new Promise(resolve => {
            this.httpService.get(`http://transport.opendata.ch/v1/connections?from=${departureStation}&to=${targetStation}`).forEach(res => {
                resolve(res.data);
            })
        });
    }

    private async getStationByName(name: string) {
        return new Promise(resolve => {
            this.httpService.get(`http://transport.opendata.ch/v1/locations?query=${name}`).forEach(res => {
                resolve(res.data.stations[0]);
            });
        });
    }

    private async getStationByCoordinates(x: number, y: number) {
        return new Promise(resolve => {
            this.httpService.get(`http://transport.opendata.ch/v1/locations?x=${x}&y=${y}`).forEach(res => {
                this.getStationByName(res.data.stations[1].name.replace(' ', '')).then(res => {
                    resolve(res);
                })
            });
        })
    }

    private getDepartureStations(requests) {
        const stations: string[] = [];
        return new Promise<string[]>(resolve => {
            requests.forEach((req: ConnectionRequestStation | ConnectionRequestCoordinate, index, array) => {
                if ((req as any).stationName) {
                    this.getStationByName((req as ConnectionRequestStation).stationName.replace(' ', ''))
                        .then(res => {
                            stations.push((res as Station).id);
                            if (stations.length === requests.length) resolve(stations);
                        });
                } else {
                    this.getStationByCoordinates(
                        (req as ConnectionRequestCoordinate).x,
                        (req as ConnectionRequestCoordinate).y
                    ).then(res => {
                        stations.push((res as Station).id);
                        if (stations.length === requests.length) resolve(stations);
                    });
                }

            });
        })
    }

}


