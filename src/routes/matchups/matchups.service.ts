import { Injectable } from '@nestjs/common';
import { CreateMatchupDto } from './dto/create-matchup.dto';
import { UpdateMatchupDto } from './dto/update-matchup.dto';
import { InjectCollectionByCollectionName } from 'src/services/firebary/firebary.decorators';
import { MATCHUPS_COLLECTION_NAME } from 'src/services/firebary/collection.names';
import { Collection, STANDARD } from '@tensingn/firebary';
import { MatchupModel } from '@tensingn/jj-bott-models';

@Injectable()
export class MatchupsService {
    constructor(
        @InjectCollectionByCollectionName(MATCHUPS_COLLECTION_NAME)
        private matchupsCollection: Collection,
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

    findMatchupsForWeekOfSeason(
        season: string,
        week: string,
    ): Promise<Array<MatchupModel>> {
        return this.matchupsCollection.getCollection({
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
