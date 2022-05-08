import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {ConnectionRequests} from "../models/connection-requests.model";
import {ConnectionRequestStation} from "../models/connection-request-station.model";
import {ConnectionRequestCoordinate} from "../models/connection-request-coordinate.model";
import {HttpService} from "@nestjs/axios";

import {Station} from "../models/station.model";
import {Connections} from "../models/connections.model";
import {Connection} from "../models/connection.model";

@Controller('connections')
export class ConnectionsController {

    constructor(private httpService: HttpService) {}


    @Post('find')
    public async findAllConnections(@Body() req: ConnectionRequests, @Res() response) {
        const departureStations: string[] = await this.getDepartureStations(req.requests);
        const connections: Connection[] = [];
        departureStations.forEach(station => {
            this.getConnection(station, req.targetStation, req.desiredTime).then(res => {
                connections.push(this.getConnectionClosestToDate(res as Connections, req.desiredTime));
                if (connections.length === departureStations.length) {
                    response.send(connections);
                }
            })
        })
    }


    private getConnectionClosestToDate(connections: Connections, date: string): Connection {
        let closestConnection: Connection = null;
        const desiredDate = new Date(date);
        connections.connections.forEach(connection => {
                const connectionDate = new Date(connection.to.arrival);
                if (!closestConnection) closestConnection = connection;
                else {
                    let closestConnectionDate = new Date(closestConnection.to.arrival);
                    const oldDifference = (closestConnectionDate.getTime() < desiredDate.getTime())
                        ? desiredDate.getTime() - closestConnectionDate.getTime()
                        : closestConnectionDate.getTime() - desiredDate.getTime();
                    const newDifference = (connectionDate.getTime() < desiredDate.getTime())
                        ? desiredDate.getTime() - connectionDate.getTime()
                        : connectionDate.getTime() - desiredDate.getTime();
                    if (newDifference < oldDifference) closestConnection = connection;
                }
        })
        return closestConnection;
    }

    private splitDateAndTime(dateTime: string) {
        const date = new Date(dateTime);
        const yearMonthDay = dateTime.substring(0, 10);

        return {
            date: yearMonthDay,
            time: `${date.getHours() + 1 < 10 ? '0' + date.getHours() + 1 : date.getHours() + 1}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
        }
    }

    private getConnection(departureStation: string, targetStation: string, dateTime: string) {
        const date: {date: string; time: string;} = this.splitDateAndTime(dateTime);
        return new Promise(resolve => {
            this.httpService.get(
                `http://transport.opendata.ch/v1/connections?from=${departureStation}&to=${targetStation}&date=${date.date}&time=${date.time}&isArrivalTime=1&limit=16`)
                .forEach(res => {
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


