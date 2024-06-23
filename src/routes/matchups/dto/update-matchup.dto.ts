import { PartialType } from '@nestjs/mapped-types';
import { CreateMatchupDto } from './create-matchup.dto';
import { IsEmpty } from 'class-validator';

export class UpdateMatchupDto extends PartialType(CreateMatchupDto) {
    @IsEmpty()
    id: string;
}
