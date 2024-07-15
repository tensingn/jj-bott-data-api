import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMatchupDto } from './dto/create-matchup.dto';
import { UpdateMatchupDto } from './dto/update-matchup.dto';
import { InjectCollectionByCollectionName } from 'src/services/firebary/firebary.decorators';
import {
    MATCHUPS_COLLECTION_NAME,
    PLAYERS_COLLECTION_NAME,
} from 'src/services/firebary/collection.names';
import { Collection, STANDARD } from '@tensingn/firebary';
import { MatchupModel } from '@tensingn/jj-bott-models';
import { FieldPath } from '@google-cloud/firestore';

@Injectable()
export class MatchupsService {
    constructor(
        @InjectCollectionByCollectionName(MATCHUPS_COLLECTION_NAME)
        private matchupsCollection: Collection,
        @InjectCollectionByCollectionName(PLAYERS_COLLECTION_NAME)
        private playersCollection: Collection,
    ) {}

    create(createMatchupDto: CreateMatchupDto): Promise<MatchupModel> {
        return this.matchupsCollection.addSingle(
            createMatchupDto as MatchupModel,
        );
    }

    bulkCreate(matchups: Array<CreateMatchupDto>) {
        const promises = new Array<Promise<void>>();

        for (let i = 0; i < matchups.length; i += 500) {
            promises.push(
                this.matchupsCollection.addMany(matchups.slice(i, i + 500)),
            );
        }

        return Promise.all(promises);
    }

    async findMatchupsForWeekOfSeason(
        season: string,
        week: string,
        includePlayers: boolean,
    ): Promise<Array<MatchupModel>> {
        if (
            !season ||
            isNaN(parseInt(season)) ||
            !week ||
            isNaN(parseInt(week))
        ) {
            throw new BadRequestException('invalid week or season');
        }

        const matchups =
            await this.matchupsCollection.getCollection<MatchupModel>({
                whereOptions: {
                    pagingOptions: STANDARD.pagingOptions,
                    whereClauses: [
                        {
                            field: 'season',
                            operation: '==',
                            value: season,
                        },
                        {
                            field: 'week',
                            operation: '==',
                            value: week,
                        },
                    ],
                    operator: 'and',
                },
            });

        if (includePlayers) {
            await Promise.all(
                matchups.map(async (matchup, index, arr) => {
                    arr[index].players =
                        await this.playersCollection.getCollection({
                            whereOptions: {
                                pagingOptions: {
                                    limit: matchup.playerIDs.length,
                                    startAfter: null,
                                },
                                whereClauses: [
                                    {
                                        field: FieldPath.documentId(),
                                        operation: 'in',
                                        value: matchup.playerIDs,
                                    },
                                ],
                            },
                        });
                    if (
                        arr[index].players.length !== matchup.playerIDs.length
                    ) {
                        console.log(
                            `Team ${matchup.teamID} missing ${matchup.playerIDs
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

        return matchups;
    }

    findOne(id: string): Promise<MatchupModel> {
        return this.matchupsCollection.getSingle(id);
    }

    update(id: string, updateMatchupDto: UpdateMatchupDto) {
        return this.matchupsCollection.updateSingle(id, updateMatchupDto);
    }

    remove(id: string) {
        return this.matchupsCollection.deleteSingle(id);
    }
}
