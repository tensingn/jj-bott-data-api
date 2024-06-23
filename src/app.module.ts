import 'dotenv/config';
import { Module } from '@nestjs/common';
import { PlayersModule } from './routes/players/players.module';
import { TeamsModule } from './routes/teams/teams.module';
import { FirebaryModule } from './services/firebary/firebary.module';
import { NFLTeamsModule } from './routes/nfl-teams/nfl-teams.module';
import { NFLGamesModule } from './routes/nfl-games/nfl-games.module';
import { SeasonsModule } from './routes/seasons/seasons.module';
import { MatchupsModule } from './routes/matchups/matchups.module';
import { UsersModule } from './routes/users/users.module';

@Module({
    imports: [
        PlayersModule,
        TeamsModule,
        NFLTeamsModule,
        FirebaryModule.forRoot({
            projectId: process.env.GCP_PROJECTID,
            ignoreUndefinedProperties: true,
        }),
        NFLGamesModule,
        SeasonsModule,
        MatchupsModule,
        UsersModule,
    ],
})
export class AppModule {}
