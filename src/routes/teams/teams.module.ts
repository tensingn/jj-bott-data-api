import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { FirebaryModule } from 'src/services/firebary/firebary.module';
import { PlayerModel, TeamModel } from '@tensingn/jj-bott-models';
import {
    PLAYERS_COLLECTION_NAME,
    TEAMS_COLLECTION_NAME,
} from 'src/services/firebary/collection.names';

@Module({
    imports: [
        FirebaryModule.forFeatures([TeamModel], TEAMS_COLLECTION_NAME),
        FirebaryModule.forFeatures([PlayerModel], PLAYERS_COLLECTION_NAME),
    ],
    controllers: [TeamsController],
    providers: [TeamsService],
})
export class TeamsModule {}
