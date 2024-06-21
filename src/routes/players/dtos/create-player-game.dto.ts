import { IsIn, IsNotEmpty, IsNumberString } from 'class-validator';
import { NFLTeamNames, NFLTeamNamesArray } from '@tensingn/jj-bott-models';
import { PlayerStatsModel } from '@tensingn/jj-bott-models/cjs/models/player-stats.model';

export class CreatePlayerGameDto {
    id: string;

    @IsNotEmpty()
    gameID: string;

    @IsNotEmpty()
    playerID: string;

    @IsNotEmpty()
    @IsNumberString()
    points: string;

    @IsNotEmpty()
    @IsIn([...NFLTeamNamesArray])
    opponent: NFLTeamNames;

    stats: PlayerStatsModel;
}
