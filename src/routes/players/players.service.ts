import { Injectable } from '@nestjs/common';
import { Collection, QueryOptions, STANDARD } from '@tensingn/firebary';
import { PlayerModel } from '@tensingn/son-of-botker-models';
import { PLAYERS_COLLECTION_NAME } from 'src/services/firebary/collection.names';
import { InjectCollectionByCollectionName } from 'src/services/firebary/firebary.decorators';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
    constructor(
        @InjectCollectionByCollectionName(PLAYERS_COLLECTION_NAME)
        private playersCollection: Collection,
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
}
