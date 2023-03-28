import { TypedData } from 'ydb-sdk';
declare class YandexDatabase {
    private _driver?;
    executeQuery(query: string): Promise<void>;
    executeQuery<T extends typeof TypedData>(query: string, entity: T, isMany?: false): Promise<InstanceType<T>>;
    executeQuery<T extends typeof TypedData>(query: string, entity: T, isMany: true): Promise<InstanceType<T>[]>;
    private getDriver;
}
export declare const db: YandexDatabase;
export {};
