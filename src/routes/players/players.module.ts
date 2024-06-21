import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PlayerGameModel, PlayerModel } from '@tensingn/jj-bott-models';
import { FirebaryModule } from 'src/services/firebary/firebary.module';
import {
    PLAYERGAMES_COLLECTION_NAME,
    PLAYERS_COLLECTION_NAME,
} from 'src/services/firebary/collection.names';

@Module({
    imports: [
        FirebaryModule.forFeatures([PlayerModel], PLAYERS_COLLECTION_NAME),
        FirebaryModule.forFeatures(
            [PlayerGameModel],
            PLAYERGAMES_COLLECTION_NAME,
        ),
    ],
    controllers: [PlayersController],
    providers: [PlayersService],
})
export class PlayersModule {}
