import { Injectable } from '@nestjs/common';
import { CreateNFLGameDto } from './dto/create-nfl-game.dto';
import { UpdateNFLGameDto } from './dto/update-nfl-game.dto';
import { NFLGameModel } from '@tensingn/jj-bott-models';
import { InjectCollectionByCollectionName } from 'src/services/firebary/firebary.decorators';
import { NFLGAMES_COLLECTION_NAME } from 'src/services/firebary/collection.names';
import {
    Collection,
    QueryOptions,
    STANDARD,
    WhereClause,
} from '@tensingn/firebary';
import { SearchNFLGamesDto } from './dto/search-nfl-games.dto';

@Injectable()
export class NFLGamesService {
    constructor(
        @InjectCollectionByCollectionName(NFLGAMES_COLLECTION_NAME)
        private nflGamesCollection: Collection,
    ) {}

    create(createNFLGameDto: CreateNFLGameDto): Promise<NFLGameModel> {
        return this.nflGamesCollection.addSingle(createNFLGameDto, true);
    }

    async bulkCreate(nflGames: Array<CreateNFLGameDto>): Promise<void> {
        const promises = new Array<Promise<void>>();

        for (let i = 0; i < nflGames.length; i += 500) {
            promises.push(
                this.nflGamesCollection.addMany(nflGames.slice(i, i + 500)),
            );
        }

        await Promise.all(promises);
    }

    findMany(query: QueryOptions = STANDARD): Promise<Array<NFLGameModel>> {
        return this.nflGamesCollection.getCollection(query);
    }

    findOne(id: string): Promise<NFLGameModel> {
        return this.nflGamesCollection.getSingle(id);
    }

    update(id: string, nflGame: UpdateNFLGameDto): Promise<Object> {
        return this.nflGamesCollection.updateSingle(id, nflGame);
    }

    async remove(id: string): Promise<void> {
        await this.nflGamesCollection.deleteSingle(id);
    }

    searchNFLGames(options: SearchNFLGamesDto): Promise<Array<NFLGameModel>> {
        const NO_LIMIT_QUERY = STANDARD;
        NO_LIMIT_QUERY.pagingOptions.limit = 1000;

        const whereClauses = Array<WhereClause<any>>();
        if (options.seasons.length) {
            whereClauses.push({
                field: 'season',
                operation: 'in',
                value: options.seasons,
            });
        }

        if (options.weeks.length) {
            whereClauses.push({
                field: 'week',
                operation: 'in',
                value: options.weeks,
            });
        }

        return this.nflGamesCollection.getCollection({
            whereOptions: {
                whereClauses,
                pagingOptions: NO_LIMIT_QUERY.pagingOptions,
            },
        });
    }
}
