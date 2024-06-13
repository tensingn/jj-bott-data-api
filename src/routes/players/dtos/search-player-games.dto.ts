import { NFLTeamNames, NFLTeamNamesArray } from '@tensingn/jj-bott-models';
import { IsArray, IsIn, IsNumberString } from 'class-validator';

export class SearchPlayerGamesDto {
    @IsArray()
    @IsIn([...NFLTeamNamesArray], { each: true })
    nflTeams: Array<NFLTeamNames>;

    @IsArray()
    @IsNumberString(null, { each: true })
    playerIDs: Array<string>;
}
