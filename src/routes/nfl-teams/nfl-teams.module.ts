import { Module } from '@nestjs/common';
import { NFLTeamsService } from './nfl-teams.service';
import { NFLTeamsController } from './nfl-teams.controller';
import { FirebaryModule } from 'src/services/firebary/firebary.module';
import { NFLTeamModel } from '@tensingn/jj-bott-models';
import { NFLTEAMS_COLLECTION_NAME } from 'src/services/firebary/collection.names';

@Module({
    imports: [
        FirebaryModule.forFeatures([NFLTeamModel], NFLTEAMS_COLLECTION_NAME),
    ],
    controllers: [NFLTeamsController],
    providers: [NFLTeamsService],
})
export class NFLTeamsModule {}
