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
import { PlayerGameModel, PlayerModel } from '@tensingn/jj-bott-models';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { STANDARD } from '@tensingn/firebary';
import { BulkCreatePlayersDto } from './dtos/bulk-create-players.dto';
import {
    PLAYERGAMES_COLLECTION_NAME,
    PLAYERS_COLLECTION_NAME,
} from 'src/services/firebary/collection.names';
import { CreatePlayerGameDto } from './dtos/create-player-game.dto';
import { BulkCreatePlayerGamesDto } from './dtos/bulk-create-player-games.dto';
import { SearchPlayerGamesDto } from './dtos/search-player-games.dto';
import { SearchPlayersDto } from './dtos/search-players.dto';
import { BulkUpdatePlayerGamesDto } from './dtos/bulk-update-player-games.dto';

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
        query.pagingOptions.startAfter = startAfter ? startAfter : null;
        query.pagingOptions.limit = limit;

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

    @Post(`:id/${PLAYERGAMES_COLLECTION_NAME}`)
    createPlayerGames(
        @Param('id') id: string,
        @Body() playerGame: CreatePlayerGameDto,
    ) {
        return this.playersService.createPlayerGame(id, playerGame);
    }

    @Post(`:id/${PLAYERGAMES_COLLECTION_NAME}/bulkCreate`)
    bulkCreatePlayerGames(
        @Param('id') id: string,
        @Body() body: BulkCreatePlayerGamesDto,
    ) {
        return this.playersService.bulkCreatePlayerGames(id, body.playerGames);
    }

    @Patch(`${PLAYERGAMES_COLLECTION_NAME}/bulkUpdate`)
    bulkUpdatePlayerGames(@Body() body: BulkUpdatePlayerGamesDto) {
        return this.playersService.bulkUpdatePlayerGames(body.playerGames);
    }

    @Post(`${PLAYERGAMES_COLLECTION_NAME}/search`)
    searchPlayerGames(
        @Body() options: SearchPlayerGamesDto,
    ): Promise<Array<PlayerGameModel>> {
        return this.playersService.searchPlayerGames(options);
    }

    @Post(`search`)
    searchPlayers(
        @Body() options: SearchPlayersDto,
    ): Promise<Array<PlayerModel>> {
        return this.playersService.searchPlayers(options);
    }
}
