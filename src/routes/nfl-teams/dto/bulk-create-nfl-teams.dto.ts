import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateNFLTeamDto } from './create-nfl-team.dto';

export class BulkCreateNFLTeamsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateNFLTeamDto)
    nflTeams: Array<CreateNFLTeamDto>;
}
