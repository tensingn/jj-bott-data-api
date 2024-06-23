import { Module } from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { SeasonsController } from './seasons.controller';
import { FirebaryModule } from 'src/services/firebary/firebary.module';
import { SeasonModel } from '@tensingn/jj-bott-models';
import { SEASONS_COLLECTION_NAME } from 'src/services/firebary/collection.names';

@Module({
    imports: [
        FirebaryModule.forFeatures([SeasonModel], SEASONS_COLLECTION_NAME),
    ],
    controllers: [SeasonsController],
    providers: [SeasonsService],
})
export class SeasonsModule {}
