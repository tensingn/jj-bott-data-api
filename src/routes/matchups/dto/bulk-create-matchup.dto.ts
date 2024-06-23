import { IsArray, ValidateNested } from 'class-validator';
import { CreateMatchupDto } from './create-matchup.dto';
import { Type } from 'class-transformer';

export class BulkCreateMatchupDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMatchupDto)
    matchups: Array<CreateMatchupDto>;
}
