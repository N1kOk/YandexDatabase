"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const ydb_sdk_1 = require("ydb-sdk");
class YandexDatabase {
    executeQuery(query, entity, isMany = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const driver = yield this.getDriver();
            const results = yield driver.tableClient.withSession((session) => __awaiter(this, void 0, void 0, function* () {
                const { resultSets } = yield session.executeQuery(query);
                return resultSets;
            }));
            if (!entity)
                return;
            if (!isMany)
                return entity.createNativeObjects(results[0])[0];
            return entity.createNativeObjects(results[0]);
        });
    }
    getDriver() {
        return __awaiter(this, void 0, void 0, function* () {
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
            if (!(yield this._driver.ready(10000))) {
                throw new Error('Driver is not ready');
            }
            return this._driver;
        });
    }
}
exports.db = new YandexDatabase();
