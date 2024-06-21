import { NFLTeamNames, NFLTeamNamesArray } from '@tensingn/jj-bott-models';
import { IsIn, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateNFLGameDto {
    @IsNotEmpty()
    id: string;

    @IsIn([...NFLTeamNamesArray])
    awayTeamName: NFLTeamNames;

    @IsIn([...NFLTeamNamesArray])
    homeTeamName: NFLTeamNames;

    @IsNumberString()
    week: string;

    @IsNumberString()
    season: string;
}
