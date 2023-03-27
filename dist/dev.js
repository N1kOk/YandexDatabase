"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
require("./shared/env");
const index_1 = require("./index");
const ydb_sdk_1 = require("ydb-sdk");
let Test = class Test extends ydb_sdk_1.TypedData {
};
Test = __decorate([
    (0, ydb_sdk_1.withTypeOptions)({ namesConversion: ydb_sdk_1.snakeToCamelCaseConversion })
], Test);
exports.Test = Test;
const SELECT_QUERY = 'SELECT * FROM test';
index_1.db.executeQuery(SELECT_QUERY, Test, false).then((value) => console.log(value));
