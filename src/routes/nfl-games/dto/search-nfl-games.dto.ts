import { NFLTeamNames, NFLTeamNamesArray } from '@tensingn/jj-bott-models';
import { IsArray, IsIn, IsNumber, IsString } from 'class-validator';

export class SearchNFLGamesDto {
    @IsArray()
    @IsString({ each: true })
    seasons: Array<string>;

    @IsArray()
    @IsString({ each: true })
    weeks: Array<string>;

    @IsArray()
    @IsIn([...NFLTeamNamesArray], { each: true })
    teams: Array<NFLTeamNames>;
}
