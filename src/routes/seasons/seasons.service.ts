import { Injectable } from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { SeasonModel } from '@tensingn/jj-bott-models';
import { InjectCollectionByCollectionName } from 'src/services/firebary/firebary.decorators';
import { SEASONS_COLLECTION_NAME } from 'src/services/firebary/collection.names';
import { Collection, STANDARD } from '@tensingn/firebary';

@Injectable()
export class SeasonsService {
    constructor(
        @InjectCollectionByCollectionName(SEASONS_COLLECTION_NAME)
        private seasonsCollection: Collection,
    ) {}

    create(createSeasonDto: CreateSeasonDto): Promise<SeasonModel> {
        return this.seasonsCollection.addSingle(createSeasonDto, true);
    }

    bulkCreate(createSeasonDtos: Array<CreateSeasonDto>) {
        return this.seasonsCollection.addMany(createSeasonDtos);
    }

    findAll(): Promise<Array<SeasonModel>> {
        return this.seasonsCollection.getCollection(STANDARD);
    }

    findOne(id: string): Promise<SeasonModel> {
        return this.seasonsCollection.getSingle(id);
    }

    update(id: string, updateSeasonDto: UpdateSeasonDto) {
        return this.seasonsCollection.updateSingle(id, updateSeasonDto);
    }

    remove(id: string) {
        return this.seasonsCollection.deleteSingle(id);
    }
}
