import { MatchupModel, TeamModel } from '@tensingn/jj-bott-models';
import { IsNumberString } from 'class-validator';

export class CreateSeasonDto {
    id: string;

    @IsNumberString()
    season: string;

    winnerID: string;

    winner: TeamModel;

    matchups: Array<MatchupModel>;

    status: string;
}
