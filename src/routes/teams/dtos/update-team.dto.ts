import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { IsEmpty } from 'class-validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
    @IsEmpty()
    id: string;
}
