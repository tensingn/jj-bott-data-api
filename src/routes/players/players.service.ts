import { BadRequestException, Injectable } from '@nestjs/common';
import { Collection, QueryOptions, STANDARD } from '@tensingn/firebary';
import { PlayerGameModel, PlayerModel } from '@tensingn/jj-bott-models';
import {
    PLAYERGAMES_COLLECTION_NAME,
    PLAYERS_COLLECTION_NAME,
} from 'src/services/firebary/collection.names';
import { InjectCollectionByCollectionName } from 'src/services/firebary/firebary.decorators';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { CreatePlayerGameDto } from './dtos/create-player-game.dto';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { SearchPlayerGamesDto } from './dtos/search-player-games.dto';

@Injectable()
export class PlayersService {
    constructor(
        @InjectCollectionByCollectionName(PLAYERS_COLLECTION_NAME)
        private playersCollection: Collection,
        @InjectCollectionByCollectionName(PLAYERGAMES_COLLECTION_NAME)
        private playerGamesCollection: Collection,
    ) {}

    create(player: CreatePlayerDto): Promise<PlayerModel> {
        return this.playersCollection.addSingle(player, true);
    }

    createMany(players: Array<CreatePlayerDto>): Promise<void> {
        return this.playersCollection.addMany(players);
    }

    findMany(query: QueryOptions = STANDARD): Promise<Array<PlayerModel>> {
        return this.playersCollection.getCollection(query);
    }

    findOne(id: string): Promise<PlayerModel> {
        return this.playersCollection.getSingle(id);
    }

    update(id: string, player: UpdatePlayerDto): Promise<Object> {
        return this.playersCollection.updateSingle(id, player);
    }

    remove(id: string): void {
        this.playersCollection.deleteSingle(id);
    }

    async createPlayerGame(id: string, playerGame: CreatePlayerGameDto) {
        if (!(await this.findOne(id))) {
            throw new NotFoundException(PlayerModel);
        }

        if (playerGame.playerID !== id) {
            throw new BadRequestException('playerGame has invalid playerID');
        }

        playerGame.id = `${playerGame.playerID}-${playerGame.gameID}`;

        return this.playerGamesCollection.addSingle(playerGame);
    }

    async bulkCreatePlayerGames(
        id: string,
        playerGames: Array<CreatePlayerGameDto>,
    ): Promise<void> {
        if (!(await this.findOne(id))) {
            throw new NotFoundException(PlayerModel);
        }

        playerGames.forEach((pg, i, arr) => {
            if (pg.playerID !== id) {
                throw new BadRequestException(
                    'playerGame has invalid playerID',
                );
            }

            arr[i].id = `${pg.playerID}-${pg.gameID}`;
        });

        return this.playerGamesCollection.addMany(playerGames);
    }

    async searchPlayerGames(searchParameters: SearchPlayerGamesDto) {
        const NO_LIMIT_QUERY = STANDARD;
        NO_LIMIT_QUERY.pagingOptions.limit = 1000;

        const promises = new Array<Promise<Array<PlayerGameModel>>>();

        searchParameters.nflTeams.forEach((nflTeam) => {
            promises.push(
                this.playerGamesCollection.getCollection({
                    whereOptions: {
                        whereClauses: [
                            {
                                field: 'playerID',
                                operation: '==',
                                value: nflTeam,
                            },
                        ],
                        pagingOptions: NO_LIMIT_QUERY.pagingOptions,
                    },
                }),
            );
        });

        searchParameters.playerIDs.forEach((playerID) => {
            promises.push(
                this.playerGamesCollection.getCollection({
                    whereOptions: {
                        whereClauses: [
                            {
                                field: 'playerID',
                                operation: '==',
                                value: playerID,
                            },
                        ],
                        pagingOptions: NO_LIMIT_QUERY.pagingOptions,
                    },
                }),
            );
        });

        return (await Promise.all(promises)).flat();
    }
}
