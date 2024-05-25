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
import { PlayersService } from './players.service';
import { PlayerModel } from '@tensingn/jj-bott-models';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { STANDARD } from '@tensingn/firebary';
import { BulkCreatePlayersDto } from './dtos/bulk-create-players.dto';
import { PLAYERS_COLLECTION_NAME } from 'src/services/firebary/collection.names';

@Controller(PLAYERS_COLLECTION_NAME)
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Post()
    create(@Body() player: CreatePlayerDto): Promise<PlayerModel> {
        return this.playersService.create(player);
    }

    @Post('bulkCreate')
    bulkCreate(@Body() body: BulkCreatePlayersDto): Promise<void> {
        return this.playersService.createMany(body.players);
    }

    @Get()
    findMany(
        @Query('startAfter') startAfter: string = null,
        @Query('limit') limit: number = 10,
    ): Promise<Array<PlayerModel>> {
        const query = STANDARD;

        if (startAfter && limit > 0) {
            query.pagingOptions.startAfter = startAfter;
            query.pagingOptions.limit = limit;
        }

        return this.playersService.findMany(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<PlayerModel> {
        return this.playersService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() player: UpdatePlayerDto,
    ): Promise<Object> {
        return this.playersService.update(id, player);
    }

    @Delete(':id')
    remove(@Param('id') id: string): void {
        this.playersService.remove(id);
    }
}
