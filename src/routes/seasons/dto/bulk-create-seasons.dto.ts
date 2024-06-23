import { IsArray, ValidateNested } from 'class-validator';
import { CreateSeasonDto } from './create-season.dto';
import { Type } from 'class-transformer';

export class BulkCreateSeasonsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSeasonDto)
    seasons: Array<CreateSeasonDto>;
}
