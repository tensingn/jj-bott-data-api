import { Module } from '@nestjs/common';
import { PlayersModule } from './routes/players/players.module';
import { TeamsModule } from './routes/teams/teams.module';

@Module({
  imports: [PlayersModule, TeamsModule],
})
export class AppModule {}
