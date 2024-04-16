import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { NFLTeamsService } from './nfl-teams.service';
import { CreateNFLTeamDto } from './dto/create-nfl-team.dto';
import { UpdateNFLTeamDto } from './dto/update-nfl-team.dto';
import { NFLTeamModel } from '@tensingn/son-of-botker-models';
import { STANDARD } from '@tensingn/firebary';
import { BulkCreateNFLTeamsDto } from './dto/bulk-create-nfl-teams.dto';

@Controller('nfl-teams')
export class NFLTeamsController {
    constructor(private readonly nflTeamsService: NFLTeamsService) {}

    @Post()
    create(@Body() nflTeam: CreateNFLTeamDto): Promise<NFLTeamModel> {
        return this.nflTeamsService.create(nflTeam);
    }

    @Post()
    bulkCreate(@Body() body: BulkCreateNFLTeamsDto): void {
        this.nflTeamsService.bulkCreate(body.nflTeams);
    }

    @Get()
    findMany(
        @Query('startAfter') startAfter: string = null,
        @Query('limit') limit: number = 10,
    ): Promise<Array<NFLTeamModel>> {
        const query = STANDARD;

        if (startAfter && limit > 0) {
            query.pagingOptions.startAfter = startAfter;
            query.pagingOptions.limit = limit;
        }

        return this.nflTeamsService.findMany(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<NFLTeamModel> {
        return this.nflTeamsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() nflTeam: UpdateNFLTeamDto,
    ): Promise<Object> {
        return this.nflTeamsService.update(id, nflTeam);
    }

    @Delete(':id')
    remove(@Param('id') id: string): void {
        return this.nflTeamsService.remove(id);
    }
}
