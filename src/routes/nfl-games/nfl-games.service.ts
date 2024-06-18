import { Injectable } from '@nestjs/common';
import { CreateNFLGameDto } from './dto/create-nfl-game.dto';
import { UpdateNFLGameDto } from './dto/update-nfl-game.dto';
import { NFLGameModel } from '@tensingn/jj-bott-models';
import { InjectCollectionByCollectionName } from 'src/services/firebary/firebary.decorators';
import { NFLGAMES_COLLECTION_NAME } from 'src/services/firebary/collection.names';
import { Collection, QueryOptions, STANDARD } from '@tensingn/firebary';

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
                this.nflGamesCollection.addMany(nflGames.slice(i, i + 499)),
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
}
