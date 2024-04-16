import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PlayerModel } from '@tensingn/son-of-botker-models';
import { FirebaryModule } from 'src/services/firebary/firebary.module';
import { PLAYERS_COLLECTION_NAME } from 'src/services/firebary/collection.names';

@Module({
    imports: [
        FirebaryModule.forFeatures([PlayerModel], PLAYERS_COLLECTION_NAME),
    ],
    controllers: [PlayersController],
    providers: [PlayersService],
})
export class PlayersModule {}
