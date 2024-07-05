import { NFLTeamNames, NFLTeamNamesArray } from '@tensingn/jj-bott-models';
import { IsArray, IsIn, IsNumber, IsNumberString } from 'class-validator';

export class SearchPlayerGamesDto {
    @IsArray()
    @IsIn([...NFLTeamNamesArray], { each: true })
    nflTeams: Array<NFLTeamNames>;

    @IsArray()
    @IsNumberString(null, { each: true })
    playerIDs: Array<string>;

    @IsArray()
    @IsNumberString(null, { each: true })
    seasons: Array<string>;

    @IsArray()
    @IsNumberString(null, { each: true })
    weeks: Array<number>;
}
