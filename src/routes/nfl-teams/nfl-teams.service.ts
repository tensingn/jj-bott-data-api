import { Injectable } from '@nestjs/common';
import { CreateNFLTeamDto } from './dto/create-nfl-team.dto';
import { UpdateNFLTeamDto } from './dto/update-nfl-team.dto';
import { InjectCollectionByCollectionName } from 'src/services/firebary/firebary.decorators';
import { NFLTEAMS_COLLECTION_NAME } from 'src/services/firebary/collection.names';
import { Collection, QueryOptions, STANDARD } from '@tensingn/firebary';
import { NFLTeamModel } from '@tensingn/son-of-botker-models';

@Injectable()
export class NFLTeamsService {
    constructor(
        @InjectCollectionByCollectionName(NFLTEAMS_COLLECTION_NAME)
        private nflTeamsCollection: Collection,
    ) {}

    create(nflTeam: CreateNFLTeamDto): Promise<NFLTeamModel> {
        return this.nflTeamsCollection.addSingle(nflTeam, true);
    }

    bulkCreate(nflTeams: Array<CreateNFLTeamDto>): Promise<void> {
        return this.nflTeamsCollection.addMany(nflTeams);
    }

    findMany(query: QueryOptions = STANDARD): Promise<Array<NFLTeamModel>> {
        return this.nflTeamsCollection.getCollection(query);
    }

    findOne(id: string): Promise<NFLTeamModel> {
        return this.nflTeamsCollection.getSingle(id);
    }

    update(id: string, nflTeam: UpdateNFLTeamDto): Promise<Object> {
        return this.nflTeamsCollection.updateSingle(id, nflTeam);
    }

    remove(id: string): void {
        this.nflTeamsCollection.deleteSingle(id);
    }
}
