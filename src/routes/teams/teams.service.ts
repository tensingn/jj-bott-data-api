import { BadRequestException, Injectable } from '@nestjs/common';
import { PlayerModel, TeamModel } from '@tensingn/jj-bott-models';
import { CreateTeamDto } from './dtos/create-team.dto';
import { Collection, STANDARD } from '@tensingn/firebary';
import { InjectCollectionByCollectionName } from 'src/services/firebary/firebary.decorators';
import {
    PLAYERS_COLLECTION_NAME,
    TEAMS_COLLECTION_NAME,
} from 'src/services/firebary/collection.names';
import { AlreadyExistsException } from 'src/exceptions/already-exists.exception';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { UpdateTeamDto } from './dtos/update-team.dto';

@Injectable()
export class TeamsService {
    constructor(
        @InjectCollectionByCollectionName(TEAMS_COLLECTION_NAME)
        private teamsCollection: Collection,
        @InjectCollectionByCollectionName(PLAYERS_COLLECTION_NAME)
        private playersCollection: Collection,
    ) {}

    async create(team: CreateTeamDto): Promise<TeamModel> {
        if (!(await this.validateTeam(team)))
            throw new BadRequestException('Invalid team');

        return this.teamsCollection.addSingle(team as TeamModel);
    }

    async bulkCreate(teams: Array<CreateTeamDto>) {
        const teamValidations = await Promise.all([
            ...teams.map((team) => this.validateTeam(team)),
        ]);
        if (teamValidations.includes(false))
            throw new BadRequestException('Invalid team');
        return this.teamsCollection.addMany(teams);
    }

    findAll(season: string): Promise<Array<TeamModel>> {
        return this.teamsCollection.getCollection({
            whereOptions: {
                pagingOptions: STANDARD.pagingOptions,
                whereClauses: [
                    {
                        field: 'seasonID',
                        operation: '==',
                        value: season,
                    },
                ],
            },
        });
    }

    findOne(id: string): Promise<TeamModel> {
        return this.teamsCollection.getSingle(id);
    }

    update(id: string, team: UpdateTeamDto) {
        return this.teamsCollection.updateSingle(id, team);
    }

    remove(id: string) {
        return this.teamsCollection.deleteSingle(id);
    }

    private async validateTeam(dto: CreateTeamDto): Promise<boolean> {
        const foundPlayers = await this.playersCollection.getCollection({
            whereOptions: {
                pagingOptions: {
                    limit: dto.playerIDs.length,
                    startAfter: null,
                },
                whereClauses: [
                    { field: 'id', operation: 'in', value: dto.playerIDs },
                ],
            },
        });

        if (foundPlayers.length !== dto.playerIDs.length) {
            return false;
        }

        return true;
    }
}
