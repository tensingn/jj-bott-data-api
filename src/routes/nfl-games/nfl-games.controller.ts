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
import { NFLGamesService } from './nfl-games.service';
import { CreateNFLGameDto } from './dto/create-nfl-game.dto';
import { UpdateNFLGameDto } from './dto/update-nfl-game.dto';
import { NFLGAMES_COLLECTION_NAME } from 'src/services/firebary/collection.names';
import { NFLGameModel } from '@tensingn/jj-bott-models';
import { STANDARD } from '@tensingn/firebary';
import { BulkCreateNFLGamesDto } from './dto/bulk-create-nfl-games.dto';

@Controller(NFLGAMES_COLLECTION_NAME)
export class NFLGamesController {
    constructor(private readonly NFLGamesService: NFLGamesService) {}

    @Post()
    create(@Body() createNFLGameDto: CreateNFLGameDto): Promise<NFLGameModel> {
        return this.NFLGamesService.create(createNFLGameDto);
    }

    @Post('bulkCreate')
    bulkCreate(@Body() body: BulkCreateNFLGamesDto): Promise<void> {
        return this.NFLGamesService.bulkCreate(body.nflGames);
    }

    @Get()
    findMany(
        @Query('startAfter') startAfter: string = null,
        @Query('limit') limit: number = 10,
    ): Promise<Array<NFLGameModel>> {
        const query = STANDARD;
        query.pagingOptions.startAfter = startAfter ? startAfter : null;
        if (!isNaN(limit)) query.pagingOptions.limit = limit;

        return this.NFLGamesService.findMany(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<NFLGameModel> {
        return this.NFLGamesService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateNFLGameDto: UpdateNFLGameDto,
    ): Promise<Object> {
        return this.NFLGamesService.update(id, updateNFLGameDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.NFLGamesService.remove(id);
    }
}
