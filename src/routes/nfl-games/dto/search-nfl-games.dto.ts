import { IsArray, IsNumber, IsString } from 'class-validator';

export class SearchNFLGamesDto {
    @IsArray()
    @IsString({ each: true })
    seasons: Array<string>;

    @IsArray()
    @IsString({ each: true })
    weeks: Array<string>;
}
