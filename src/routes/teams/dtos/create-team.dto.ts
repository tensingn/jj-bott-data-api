import { IsArray, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateTeamDto {
    id: string;

    @IsString()
    username: string;

    @IsString()
    teamName: string;

    wins: number;

    losses: number;

    pointsFor: number;

    pointsAgainst: number;

    @IsArray()
    @IsString({ each: true })
    playerIDs: Array<string>;

    @IsArray()
    @IsString({ each: true })
    starterIDs: Array<string>;

    @IsNotEmpty()
    rosterID: number;

    @IsNumberString()
    userID: string;

    @IsNumberString()
    seasonID: string;
}
