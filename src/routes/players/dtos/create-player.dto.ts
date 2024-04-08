import {
    NFLTeamNames,
    NFLTeamNamesArray,
    PlayerGameModel,
    PlayerStatusNames,
    PlayerStatusNamesArray,
    PositionNames,
    PositionNamesArray,
} from '@tensingn/son-of-botker-models';
import { IsDate, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreatePlayerDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    tankID: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    fullName: string;

    @IsNotEmpty()
    @IsIn([...NFLTeamNamesArray, 'NotSet'])
    team: NFLTeamNames | 'NotSet';

    @IsNotEmpty()
    @IsIn([...PositionNamesArray, 'NotSet'], { each: true })
    positions: Array<PositionNames | 'NotSet'>;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    depthPosition: number;

    @IsNotEmpty()
    @IsIn([...PlayerStatusNamesArray, 'NotSet'])
    status: PlayerStatusNames | 'NotSet';

    games: Array<PlayerGameModel>;
}
