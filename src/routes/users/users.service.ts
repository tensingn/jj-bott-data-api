import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from '@tensingn/jj-bott-models';
import { InjectCollectionByCollectionName } from 'src/services/firebary/firebary.decorators';
import { USERS_COLLECTION_NAME } from 'src/services/firebary/collection.names';
import { Collection, STANDARD } from '@tensingn/firebary';

@Injectable()
export class UsersService {
    constructor(
        @InjectCollectionByCollectionName(USERS_COLLECTION_NAME)
        private usersCollection: Collection,
    ) {}

    create(createUserDto: CreateUserDto): Promise<UserModel> {
        return this.usersCollection.addSingle(createUserDto, true);
    }

    bulkCreate(users: Array<CreateUserDto>) {
        return this.usersCollection.addMany(users);
    }

    findAll(): Promise<Array<UserModel>> {
        return this.usersCollection.getCollection(STANDARD);
    }

    findOne(id: string): Promise<UserModel> {
        return this.usersCollection.getSingle(id);
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return this.usersCollection.updateSingle(id, updateUserDto);
    }

    remove(id: string) {
        return this.usersCollection.deleteSingle(id);
    }
}
