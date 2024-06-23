import { IsArray, ValidateNested } from 'class-validator';
import { CreateTeamDto } from './create-team.dto';
import { Type } from 'class-transformer';

export class BulkCreateTeamsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTeamDto)
    teams: Array<CreateTeamDto>;
}
