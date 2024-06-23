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
import { MatchupsService } from './matchups.service';
import { CreateMatchupDto } from './dto/create-matchup.dto';
import { UpdateMatchupDto } from './dto/update-matchup.dto';
import { MatchupModel } from '@tensingn/jj-bott-models';
import { BulkCreateMatchupDto } from './dto/bulk-create-matchup.dto';

@Controller('matchups')
export class MatchupsController {
    constructor(private readonly matchupsService: MatchupsService) {}

    @Post()
    create(@Body() createMatchupDto: CreateMatchupDto) {
        return this.matchupsService.create(createMatchupDto);
    }

    @Post('bulkCreate')
    bulkCreate(@Body() bulkCreateMatchupDto: BulkCreateMatchupDto) {
        return this.matchupsService.bulkCreate(bulkCreateMatchupDto.matchups);
    }

    @Get()
    findMatchupsForWeekOfSeason(
        @Query('season') season: string,
        @Query('week') week: string,
    ): Promise<Array<MatchupModel>> {
        return this.matchupsService.findMatchupsForWeekOfSeason(season, week);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<MatchupModel> {
        return this.matchupsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateMatchupDto: UpdateMatchupDto,
    ) {
        return this.matchupsService.update(id, updateMatchupDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.matchupsService.remove(id);
    }
}
