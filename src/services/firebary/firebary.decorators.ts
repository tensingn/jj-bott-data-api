import { Inject, Type } from '@nestjs/common';

export const InjectCollectionByType = (
    entity: Type,
): ReturnType<typeof Inject> => Inject(entity.name.toLocaleLowerCase());

export const InjectCollectionByCollectionName = (
    collectionName: string,
): ReturnType<typeof Inject> => Inject(collectionName);
