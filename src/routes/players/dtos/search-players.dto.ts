import { PositionNames, PositionNamesArray } from '@tensingn/jj-bott-models';
import { IsArray, IsIn, IsNumber } from 'class-validator';

export class SearchPlayersDto {
    startAfter: string;

    @IsNumber()
    limit: number;

    @IsArray()
    @IsIn([...PositionNamesArray], { each: true })
    positions: Array<PositionNames>;
}
