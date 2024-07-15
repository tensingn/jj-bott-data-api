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
import { TeamsService } from './teams.service';
import { TeamModel } from '@tensingn/jj-bott-models';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { BulkCreateTeamsDto } from './dtos/bulk-create-teams.dto';

@Controller('teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @Post()
    create(@Body() team: CreateTeamDto): Promise<TeamModel> {
        return this.teamsService.create(team);
    }

    @Post('bulkCreate')
    bulkCreate(@Body() bulkCreateTeamsDto: BulkCreateTeamsDto) {
        return this.teamsService.bulkCreate(bulkCreateTeamsDto.teams);
    }

    @Get()
    findAll(
        @Query('season') season: string,
        @Query('includePlayers') includePlayers: boolean,
    ) {
        return this.teamsService.findAll(season, includePlayers);
    }

    @Get(':id')
    findOne(
        @Param('id') id: string,
        @Query('includePlayers') includePlayers: boolean,
    ) {
        return this.teamsService.findOne(id, includePlayers);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() team: UpdateTeamDto) {
        return this.teamsService.update(id, team);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.teamsService.remove(id);
    }
}
