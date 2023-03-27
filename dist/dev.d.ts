import './shared/env';
import { TypedData } from 'ydb-sdk';
export declare class Test extends TypedData {
    id: number;
    name: string;
    phone: number;
    ttl: string;
}
