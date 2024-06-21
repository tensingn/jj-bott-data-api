import { PartialType } from '@nestjs/mapped-types';
import { CreateNFLGameDto } from './create-nfl-game.dto';

export class UpdateNFLGameDto extends PartialType(CreateNFLGameDto) {}
