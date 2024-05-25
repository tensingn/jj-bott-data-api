import { Injectable } from '@nestjs/common';
import { CreateNFLTeamDto } from './dto/create-nfl-team.dto';
import { UpdateNFLTeamDto } from './dto/update-nfl-team.dto';
import { InjectCollectionByCollectionName } from 'src/services/firebary/firebary.decorators';
import { NFLTEAMS_COLLECTION_NAME } from 'src/services/firebary/collection.names';
import { Collection, QueryOptions, STANDARD } from '@tensingn/firebary';
import { NFLTeamModel } from '@tensingn/jj-bott-models';

@Injectable()
export class NFLTeamsService {
    constructor(
        @InjectCollectionByCollectionName(NFLTEAMS_COLLECTION_NAME)
        private nflTeamsCollection: Collection,
    ) {}

    async create(nflTeam: CreateNFLTeamDto): Promise<NFLTeamModel> {
        return this.nflTeamsCollection.addSingle(nflTeam, true);
    }

    bulkCreate(nflTeams: Array<CreateNFLTeamDto>): Promise<void> {
        return this.nflTeamsCollection.addMany(nflTeams);
    }

    async bulkUpdate(nflTeams: Array<UpdateNFLTeamDto>): Promise<void> {
        const nflTeamsToUpdateWithIds: Array<{
            id: string;
            data: UpdateNFLTeamDto;
        }> = nflTeams.map((nflTeam) => {
            return {
                id: nflTeam.id,
                data: nflTeam,
            };
        });

        await this.nflTeamsCollection.updateMany(nflTeamsToUpdateWithIds);
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

    async remove(id: string): Promise<void> {
        await this.nflTeamsCollection.deleteSingle(id);
    }
}
