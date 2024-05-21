import 'dotenv/config';
import { Module } from '@nestjs/common';
import { PlayersModule } from './routes/players/players.module';
import { TeamsModule } from './routes/teams/teams.module';
import { FirebaryModule } from './services/firebary/firebary.module';
import { NFLTeamsModule } from './routes/nfl-teams/nfl-teams.module';

@Module({
    imports: [
        PlayersModule,
        TeamsModule,
        NFLTeamsModule,
        FirebaryModule.forRoot({
            projectId: process.env.GCP_PROJECTID,
            ignoreUndefinedProperties: true,
        }),
    ],
})
export class AppModule {}
