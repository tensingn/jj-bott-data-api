import { PartialType } from '@nestjs/mapped-types';
import { CreateSeasonDto } from './create-season.dto';
import { IsEmpty } from 'class-validator';

export class UpdateSeasonDto extends PartialType(CreateSeasonDto) {
    @IsEmpty()
    id: string;
}
