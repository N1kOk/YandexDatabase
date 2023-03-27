import './shared/env'
import { db } from './index'
import { snakeToCamelCaseConversion, TypedData, withTypeOptions } from 'ydb-sdk'

@withTypeOptions({ namesConversion: snakeToCamelCaseConversion })
export class Test extends TypedData {
	// @ts-ignore
	public id: number
	
	// @ts-ignore
	public name: string
	
	// @ts-ignore
	public phone: number
	
	// @ts-ignore
	public ttl: string
}

// db.executeQuery('UPDATE test SET name = "test-test"').then(() => console.log('OK'))

const SELECT_QUERY = 'SELECT * FROM test'

db.executeQuery(SELECT_QUERY, Test, false).then((value) => console.log(value))
