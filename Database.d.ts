import { EventEmitter } from 'events';
import { Connection, Model, Mongoose } from 'mongoose';

export default class Database extends EventEmitter {
    public readonly mongoose: Mongoose;
    public readonly db: Connection;
    public schemas: { [key: string]: any };
    public models: { [key: string]: Model<any> };

    constructor(url: string, schemas: any);

    connect(): void;
    isReady(): boolean;

    static createUrl(urlData: { host: string, port: string, database: string, username: string, password: string }): string;
}
