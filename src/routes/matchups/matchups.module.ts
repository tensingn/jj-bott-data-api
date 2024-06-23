import { Module } from '@nestjs/common';
import { MatchupsService } from './matchups.service';
import { MatchupsController } from './matchups.controller';
import { FirebaryModule } from 'src/services/firebary/firebary.module';
import { MatchupModel } from '@tensingn/jj-bott-models';
import { MATCHUPS_COLLECTION_NAME } from 'src/services/firebary/collection.names';

@Module({
    imports: [
        FirebaryModule.forFeatures([MatchupModel], MATCHUPS_COLLECTION_NAME),
    ],
    controllers: [MatchupsController],
    providers: [MatchupsService],
})
export class MatchupsModule {}
