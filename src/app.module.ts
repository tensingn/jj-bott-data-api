import 'dotenv/config';
import { Module } from '@nestjs/common';
import { PlayersModule } from './routes/players/players.module';
import { TeamsModule } from './routes/teams/teams.module';
import { FirebaryModule } from './services/firebary/firebary.module';

@Module({
    imports: [
        PlayersModule,
        TeamsModule,
        FirebaryModule.forRoot({
            projectId: process.env.GCP_PROJECTID,
            keyFilename: process.env.GCP_KEYFILENAME,
            ignoreUndefinedProperties: true,
        }),
    ],
})
export class AppModule {}
