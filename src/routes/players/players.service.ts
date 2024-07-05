import { BadRequestException, Injectable } from '@nestjs/common';
import {
    Collection,
    QueryOptions,
    STANDARD,
    WhereClause,
} from '@tensingn/firebary';
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
import { SearchPlayersDto } from './dtos/search-players.dto';
import { UpdatePlayerGameDto } from './dtos/update-player-game.dto';

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

    async bulkUpdatePlayerGames(
        playerGames: Array<UpdatePlayerGameDto>,
    ): Promise<void> {
        const promises = new Array<Promise<Object>>();

        for (let i = 0; i < playerGames.length; i += 500) {
            promises.push(
                this.playerGamesCollection.updateMany(
                    playerGames.slice(i, i + 500).map((playerGame) => {
                        const { id, ...data } = playerGame;
                        return {
                            id,
                            data,
                        };
                    }),
                ),
            );
        }

        await Promise.all(promises);
    }

    async searchPlayerGames(
        options: SearchPlayerGamesDto,
    ): Promise<Array<PlayerGameModel>> {
        const NO_LIMIT_QUERY = STANDARD;
        NO_LIMIT_QUERY.pagingOptions.limit = 1000;

        const promises = new Array<Promise<Array<PlayerGameModel>>>();

        if (options.weeks.length && !options.seasons.length) {
            throw new Error(
                'cannot search player games by week without season',
            );
        }
        if (options.weeks.length && options.seasons.length) {
            if (options.playerIDs.length || options.nflTeams.length) {
                throw new Error(
                    'if searching by week and season, cannot also search by playerID or nflTeam',
                );
            }

            const whereClauses: Array<WhereClause<any>> = [
                {
                    field: 'season',
                    operation: 'in',
                    value: options.seasons,
                },
                {
                    field: 'week',
                    operation: 'in',
                    value: options.weeks,
                },
            ];
            promises.push(
                this.playerGamesCollection.getCollection({
                    whereOptions: {
                        whereClauses,
                        pagingOptions: NO_LIMIT_QUERY.pagingOptions,
                    },
                }),
            );
        } else {
            options.nflTeams.forEach((nflTeam) => {
                const whereClauses: Array<WhereClause<any>> = [
                    {
                        field: 'playerID',
                        operation: '==',
                        value: nflTeam,
                    },
                ];
                if (options.seasons.length) {
                    whereClauses.push({
                        field: 'season',
                        operation: 'in',
                        value: options.seasons,
                    });
                }
                promises.push(
                    this.playerGamesCollection.getCollection({
                        whereOptions: {
                            whereClauses,
                            pagingOptions: NO_LIMIT_QUERY.pagingOptions,
                        },
                    }),
                );
            });

            options.playerIDs.forEach((playerID) => {
                const whereClauses: Array<WhereClause<any>> = [
                    {
                        field: 'playerID',
                        operation: '==',
                        value: playerID,
                    },
                ];
                if (options.seasons.length) {
                    whereClauses.push({
                        field: 'season',
                        operation: 'in',
                        value: options.seasons,
                    });
                }
                promises.push(
                    this.playerGamesCollection.getCollection({
                        whereOptions: {
                            whereClauses,
                            pagingOptions: NO_LIMIT_QUERY.pagingOptions,
                        },
                    }),
                );
            });
        }

        return (await Promise.all(promises)).flat();
    }

    async searchPlayers(
        options: SearchPlayersDto,
    ): Promise<Array<PlayerModel>> {
        const NO_LIMIT_QUERY = STANDARD;
        NO_LIMIT_QUERY.pagingOptions.limit = options.limit;
        NO_LIMIT_QUERY.pagingOptions.startAfter = options.startAfter
            ? options.startAfter
            : null;

        return this.playersCollection.getCollection({
            whereOptions: {
                whereClauses: [
                    {
                        field: 'positions',
                        operation: 'array-contains-any',
                        value: options.positions,
                    },
                ],
                pagingOptions: NO_LIMIT_QUERY.pagingOptions,
            },
        });
    }
}
