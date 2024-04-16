import { PartialType } from '@nestjs/mapped-types';
import { CreateNFLTeamDto } from './create-nfl-team.dto';

export class UpdateNFLTeamDto extends PartialType(CreateNFLTeamDto) {}
