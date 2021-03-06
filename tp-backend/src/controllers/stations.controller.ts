import {Controller, Get, Param, Res, UseGuards} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";

@Controller('stations')
export class StationsController {

    constructor(private httpService: HttpService) {}

    @UseGuards(JwtAuthGuard)
    @Get('find/:query')
    public getStations(@Param('query') query, @Res() response) {
        if (query) {
            this.httpService.get(
                `http://transport.opendata.ch/v1/locations?query=${query.replace('/', '%2F')}&type=station`)
                .forEach(res => {
                    response.send(res.data)
                })
        } else {
            response.send('Error: Empty query!')
        }
    }
}
