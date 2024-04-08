import { DynamicModule, Global, Module } from '@nestjs/common';
import { Settings } from '@google-cloud/firestore';
import { Collection, Type } from '@tensingn/firebary';

export const FIREBARY_OPTIONS = 'FIREBARY_OPTIONS';

@Module({})
export class FirebaryModule {
    static forRoot(options: Settings): DynamicModule {
        return {
            module: FirebaryModule,
            imports: [FirebaryCoreModule.forRoot(options)],
        };
    }

    static forFeatures(
        types: Array<Type>,
        collectionName: string,
    ): DynamicModule {
        return {
            module: FirebaryModule,
            providers: [
                {
                    provide: collectionName,
                    useFactory: (options: Settings) =>
                        new Collection(options, types, collectionName),
                    inject: [FIREBARY_OPTIONS],
                },
            ],
            exports: [collectionName],
        };
    }
}

@Global()
@Module({})
class FirebaryCoreModule {
    static forRoot(options: Settings): DynamicModule {
        return {
            module: FirebaryCoreModule,
            providers: [
                {
                    provide: FIREBARY_OPTIONS,
                    useValue: options,
                },
            ],
            exports: [FIREBARY_OPTIONS],
        };
    }
}
