import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateNFLTeamDto } from './update-nfl-team.dto';

export class BulkUpdateNFLTeamsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateNFLTeamDto)
    nflTeams: Array<UpdateNFLTeamDto>;
}
