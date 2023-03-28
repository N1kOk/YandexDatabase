"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const ydb_sdk_1 = require("ydb-sdk");
class YandexDatabase {
    _driver;
    async executeQuery(query, entity, isMany = false) {
        const driver = await this.getDriver();
        const results = await driver.tableClient.withSession(async (session) => {
            const { resultSets } = await session.executeQuery(query);
            return resultSets;
        });
        if (!entity)
            return;
        if (!isMany)
            return entity.createNativeObjects(results[0])[0];
        return entity.createNativeObjects(results[0]);
    }
    async getDriver() {
        if (this._driver) {
            return this._driver;
        }
        const isDataExists = process.env.YDB_SERVICE_ACCOUNT_KEY_FILE_CREDENTIALS &&
            process.env.YDB_ENDPOINT &&
            process.env.YDB_DATABASE;
        if (!isDataExists) {
            throw new Error('Required environment variables:\n' +
                '	YDB_SERVICE_ACCOUNT_KEY_FILE_CREDENTIALS\n' +
                '	YDB_ENDPOINT\n' +
                '	YDB_DATABASE');
        }
        this._driver = new ydb_sdk_1.Driver({
            endpoint: process.env.YDB_ENDPOINT,
            database: process.env.YDB_DATABASE,
            authService: (0, ydb_sdk_1.getCredentialsFromEnv)(),
        });
        if (!await this._driver.ready(10000)) {
            throw new Error('Driver is not ready');
        }
        return this._driver;
    }
}
exports.db = new YandexDatabase();
