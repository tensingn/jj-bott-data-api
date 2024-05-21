import {
    NFLTeamNames,
    NFLTeamNamesArray,
} from '@tensingn/son-of-botker-models';
import { IsArray, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateNFLTeamDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @IsIn([...NFLTeamNamesArray])
    teamName: NFLTeamNames;

    @IsArray()
    @IsString({ each: true })
    gameIDs: Array<string>;
}
