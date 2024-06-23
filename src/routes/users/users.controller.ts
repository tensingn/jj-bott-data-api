import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from '@tensingn/jj-bott-models';
import { BulkCreateUsersDto } from './dto/bulk-create-users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
        return this.usersService.create(createUserDto);
    }

    @Post('bulkCreate')
    bulkCreate(@Body() bulkCreateUsersDto: BulkCreateUsersDto) {
        return this.usersService.bulkCreate(bulkCreateUsersDto.users);
    }

    @Get()
    findAll(): Promise<Array<UserModel>> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<UserModel> {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
