import {Body, Controller, Param, Post, Res} from "@nestjs/common";
import {ConnectionRequests} from "../../../shared/models/api-requests/connection-requests.model";
import {ConnectionRequestStation} from "../../../shared/models/connection/connection-request-station.model";
import {ConnectionRequestCoordinate} from "../../../shared/models/connection/connection-request-coordinate.model";
import {HttpService} from "@nestjs/axios";

import {Station} from "../../../shared/models/station/station.model";
import {Connections} from "../../../shared/models/connection/connections.model";
import {Connection} from "../../../shared/models/connection/connection.model";
import {ConnectionsResponse} from "../../../shared/models/api-responses/connections-response.model";

@Controller('connections')
export class ConnectionsController {

    constructor(private httpService: HttpService) {}


    @Post('find')
    public async findAllConnections(@Body() req: ConnectionRequests, @Res() response) {
        const departureStations: {id: number; station: string}[] = await this.getDepartureStations(req.requests);
        const connections: ConnectionsResponse[] = [];
        departureStations.forEach(station => {
            this.getConnection(station.station, req.targetStation, req.desiredTime).then(res => {
                connections.push({participantId: station.id, connection: this.getConnectionClosestToDate(res as Connections, req.desiredTime)});
                if (connections.length === departureStations.length) {
                    response.send(connections);
                }
            })
        })
    }

    @Post('earlier')
    public findEarlierConnection(@Body() req: ConnectionsResponse, @Res() response) {
        this.getConnection(req.connection.from.station.id, req.connection.to.station.id, req.connection.to.arrival.toString()).then(res => {
            const connections = (res as Connections).connections;
            const currentConnectionIndex = connections.findIndex(connection => connection.to.arrivalTimestamp === req.connection.to.arrivalTimestamp);
            response.send({...req, connection: connections[currentConnectionIndex - 1]});
        })
    }

    @Post('later')
    public findLaterConnection(@Body() req: ConnectionsResponse, @Res() response) {
        const date = this.addHoursToDate(new Date(req.connection.to.arrivalTimestamp * 1000), 1);
        this.getConnection(req.connection.from.station.id, req.connection.to.station.id, req.connection.to.arrival.toString()).then(res => {
            this.getConnection(req.connection.from.station.id, req.connection.to.station.id, date.toISOString()).then(res2 => {
                const connections = (res as Connections).connections
                    .concat((res2 as Connections).connections)
                    .sort((a, b) => a.to.arrivalTimestamp - b.to.arrivalTimestamp);
                const currentConnectionIndex = connections.findIndex(connection => connection.to.arrivalTimestamp === req.connection.to.arrivalTimestamp)
                const nextConnection = connections[currentConnectionIndex + 1].to.arrivalTimestamp === req.connection.to.arrivalTimestamp ? connections[currentConnectionIndex + 2] : connections[currentConnectionIndex + 1]
                response.send({...req, connection: nextConnection});
            })
        })
    }


    private getConnectionClosestToDate(connections: Connections, date: string): Connection {
        let closestConnection: Connection = null;
        const desiredDate = Date.parse(date) / 1000;
        connections.connections.forEach(connection => {
            const connectionDate = connection.to.arrivalTimestamp;
            if (!closestConnection) closestConnection = connection;
            else {
                let closestConnectionDate = closestConnection.to.arrivalTimestamp;
                let oldDifference = desiredDate - closestConnectionDate
                let newDifference = desiredDate - connectionDate;
                if (newDifference < 0) newDifference = newDifference * -1;
                if (oldDifference < 0) oldDifference = oldDifference * -1;
                if (newDifference < oldDifference) closestConnection = connection;
            }
        })
        return closestConnection;
    }

    private splitDateAndTime(dateTime: string) {
        const date = this.add30MinutesToDate(new Date(dateTime));
        const yearMonthDay = dateTime.substring(0, 10);
        return {
            date: yearMonthDay,
            time: `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
        }
    }

    private add30MinutesToDate(date: Date): Date {
        date.setMinutes(date.getMinutes() + 30);
        if (date.getMinutes() >= 60) {
            date.setMinutes(date.getMinutes() - 60);
            date.setHours(date.getHours() + 1);
            if (date.getHours() >= 24) {
                date.setHours(date.getHours() - 24);
                date.setDate(date.getDate() + 1);
            }
        }
        return date;
    }

    private addHoursToDate(date: Date, hours: number): Date {
        //  additional +2, because the date already comes in the format UTC+0200, so 2 hours delayed
        date.setHours(date.getHours() + hours + 2);
        if (date.getHours() >= 24) {
            date.setHours(date.getHours() - 24)
            date.setDate(date.getDate() + 1)
        }
        return date;
    }

    private getConnection(departureStation: string, targetStation: string, dateTime: string, ) {
        const date: {date: string; time: string;} = this.splitDateAndTime(dateTime);
        return new Promise(resolve => {
            this.httpService.get(
                `http://transport.opendata.ch/v1/connections?from=${departureStation}&to=${targetStation}&date=${date.date}&time=${date.time}&isArrivalTime=1&limit=16&page=3`)
                .forEach(res => {
                    this.httpService.get(
                        `http://transport.opendata.ch/v1/connections?from=${departureStation}&to=${targetStation}&date=${date.date}&time=${date.time}&isArrivalTime=1&limit=16&page=0`)
                        .forEach(res2 => {
                            const connections: Connections = {connections: []};
                            (res.data as Connections).connections.forEach(connection => connections.connections.push(connection));
                            (res2.data as Connections).connections.forEach(connection => connections.connections.push(connection));
                            resolve(connections);
                        })
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
        const stations: {id: number, station: string}[] = [];
        return new Promise<{id: number, station: string}[]>(resolve => {
            requests.forEach((req: ConnectionRequestStation | ConnectionRequestCoordinate, index, array) => {
                if ((req as any).stationName) {
                    this.getStationByName((req as ConnectionRequestStation).stationName.replace(' ', '%20'))
                        .then(res => {
                            stations.push({id: req.participantId, station: (res as Station).id});
                            if (stations.length === requests.length) resolve(stations);
                        });
                } else {
                    this.getStationByCoordinates(
                        (req as ConnectionRequestCoordinate).x,
                        (req as ConnectionRequestCoordinate).y
                    ).then(res => {
                        stations.push({id: req.participantId, station: (res as Station).id
                        });
                        if (stations.length === requests.length) resolve(stations);
                    });
                }

            });
        })
    }



}


