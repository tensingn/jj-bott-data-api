import { Module } from '@nestjs/common';
import { NFLGamesService } from './nfl-games.service';
import { NFLGamesController } from './nfl-games.controller';
import { FirebaryModule } from 'src/services/firebary/firebary.module';
import { NFLGameModel } from '@tensingn/jj-bott-models';
import { NFLGAMES_COLLECTION_NAME } from 'src/services/firebary/collection.names';

@Module({
    imports: [
        FirebaryModule.forFeatures([NFLGameModel], NFLGAMES_COLLECTION_NAME),
    ],
    controllers: [NFLGamesController],
    providers: [NFLGamesService],
})
export class NFLGamesModule {}
