import { BadRequestException, Injectable } from '@nestjs/common';
import { TeamModel } from '@tensingn/jj-bott-models';
import { CreateTeamDto } from './dtos/create-team.dto';
import { Collection, STANDARD } from '@tensingn/firebary';
import { InjectCollectionByCollectionName } from 'src/services/firebary/firebary.decorators';
import {
    PLAYERS_COLLECTION_NAME,
    TEAMS_COLLECTION_NAME,
} from 'src/services/firebary/collection.names';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { FieldPath } from '@google-cloud/firestore';

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

    async findAll(
        season: string,
        includePlayers: boolean,
    ): Promise<Array<TeamModel>> {
        if (!season || isNaN(parseInt(season))) {
            throw new BadRequestException('invalid season');
        }

        const teams = await this.teamsCollection.getCollection<TeamModel>({
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

        if (includePlayers) {
            await Promise.all(
                teams.map(async (team, index, arr) => {
                    arr[index].players =
                        await this.playersCollection.getCollection({
                            whereOptions: {
                                pagingOptions: {
                                    limit: team.playerIDs.length,
                                    startAfter: null,
                                },
                                whereClauses: [
                                    {
                                        field: FieldPath.documentId(),
                                        operation: 'in',
                                        value: team.playerIDs,
                                    },
                                ],
                            },
                        });
                    if (arr[index].players.length !== team.playerIDs.length) {
                        console.log(
                            `Team ${team.teamName} missing ${team.playerIDs
                                .filter(
                                    (pid) =>
                                        !arr[index].players.find(
                                            (p) => p.id === pid,
                                        ),
                                )
                                ?.join(',')}`,
                        );
                    }
                }),
            );
        }

        return teams;
    }

    async findOne(id: string, includePlayers: boolean): Promise<TeamModel> {
        const team = await this.teamsCollection.getSingle<TeamModel>(id);

        if (!team) {
            throw new NotFoundException(TeamModel);
        }

        if (includePlayers) {
            team.players = await this.playersCollection.getCollection({
                whereOptions: {
                    pagingOptions: {
                        limit: team.playerIDs.length,
                        startAfter: null,
                    },
                    whereClauses: [
                        {
                            field: FieldPath.documentId(),
                            operation: 'in',
                            value: team.playerIDs,
                        },
                    ],
                },
            });
        }

        return team;
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
                    {
                        field: FieldPath.documentId(),
                        operation: 'in',
                        value: dto.playerIDs,
                    },
                ],
            },
        });

        if (foundPlayers.length !== dto.playerIDs.length) {
            return false;
        }

        return true;
    }
}
