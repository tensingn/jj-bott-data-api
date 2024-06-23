import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { SeasonModel } from '@tensingn/jj-bott-models';
import { BulkCreateSeasonsDto } from './dto/bulk-create-seasons.dto';

@Controller('seasons')
export class SeasonsController {
    constructor(private readonly seasonsService: SeasonsService) {}

    @Post()
    create(@Body() createSeasonDto: CreateSeasonDto): Promise<SeasonModel> {
        return this.seasonsService.create(createSeasonDto);
    }

    @Post('bulkCreate')
    bulkCreate(@Body() bulkCreateSeasonsDto: BulkCreateSeasonsDto) {
        return this.seasonsService.bulkCreate(bulkCreateSeasonsDto.seasons);
    }

    @Get()
    findMany(): Promise<Array<SeasonModel>> {
        return this.seasonsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<SeasonModel> {
        return this.seasonsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSeasonDto: UpdateSeasonDto) {
        return this.seasonsService.update(id, updateSeasonDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.seasonsService.remove(id);
    }
}
