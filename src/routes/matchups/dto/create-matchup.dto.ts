import { IsArray, IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateMatchupDto {
    id: string;

    @IsNumberString()
    week: string;

    @IsNumberString()
    season: string;

    @IsNumberString()
    matchupID: string;

    @IsArray()
    @IsString({ each: true })
    starterIDs: Array<string>;

    @IsArray()
    @IsString({ each: true })
    playerIDs: Array<string>;

    @IsNumber()
    points: number;

    @IsNumberString()
    teamID: string;
}
