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
import { NFLTeamModel } from '@tensingn/jj-bott-models';
import { STANDARD } from '@tensingn/firebary';
import { BulkCreateNFLTeamsDto } from './dto/bulk-create-nfl-teams.dto';
import { NFLTEAMS_COLLECTION_NAME } from 'src/services/firebary/collection.names';
import { BulkUpdateNFLTeamsDto } from './dto/bulk-update-nfl-teams.dto';

@Controller(NFLTEAMS_COLLECTION_NAME)
export class NFLTeamsController {
    constructor(private readonly nflTeamsService: NFLTeamsService) {}

    @Post()
    create(@Body() nflTeam: CreateNFLTeamDto): Promise<NFLTeamModel> {
        return this.nflTeamsService.create(nflTeam);
    }

    @Post('bulkCreate')
    bulkCreate(@Body() body: BulkCreateNFLTeamsDto): Promise<void> {
        return this.nflTeamsService.bulkCreate(body.nflTeams);
    }

    @Patch('bulkUpdate')
    bulkUpdate(@Body() body: BulkUpdateNFLTeamsDto): Promise<void> {
        return this.nflTeamsService.bulkUpdate(body.nflTeams);
    }

    @Get()
    findMany(
        @Query('startAfter') startAfter: string = null,
        @Query('limit') limit: number,
    ): Promise<Array<NFLTeamModel>> {
        const query = STANDARD;

        if (startAfter) query.pagingOptions.startAfter = startAfter;

        if (!isNaN(limit)) query.pagingOptions.limit = limit;

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
    remove(@Param('id') id: string): Promise<void> {
        return this.nflTeamsService.remove(id);
    }
}
