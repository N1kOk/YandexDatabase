import { Driver, getCredentialsFromEnv, TypedData } from 'ydb-sdk'

class YandexDatabase {
	private _driver?: Driver
	
	public async executeQuery(query: string): Promise<void>
	public async executeQuery<T extends typeof TypedData>(query: string, entity: T, isMany?: false): Promise<InstanceType<T>>
	public async executeQuery<T extends typeof TypedData>(query: string, entity: T, isMany: true): Promise<InstanceType<T>[]>
	public async executeQuery<T extends typeof TypedData>(query: string, entity?: T, isMany = false): Promise<InstanceType<T> | InstanceType<T>[] | void> {
		const driver = await this.getDriver()
		
		const results = await driver.tableClient.withSession(async (session) => {
			const { resultSets } = await session.executeQuery(query)
			return resultSets
		})
		
		if (!entity) return
		
		if (!isMany)
			return entity.createNativeObjects(results[0])[0] as InstanceType<T>
		
		return entity.createNativeObjects(results[0]) as InstanceType<T>[]
	}
	
	private async getDriver(): Promise<Driver> {
		if (this._driver) {
			return this._driver
		}
		
		const isDataExists =
			process.env.YDB_SERVICE_ACCOUNT_KEY_FILE_CREDENTIALS &&
			process.env.YDB_ENDPOINT &&
			process.env.YDB_DATABASE
		
		if (!isDataExists) {
			throw new Error('Required environment variables:\n' +
							'	YDB_SERVICE_ACCOUNT_KEY_FILE_CREDENTIALS\n' +
							'	YDB_ENDPOINT\n' +
							'	YDB_DATABASE')
		}
		
		this._driver = new Driver({
			endpoint: process.env.YDB_ENDPOINT,
			database: process.env.YDB_DATABASE,
			authService: getCredentialsFromEnv(),
		})
		
		if (!await this._driver.ready(10000)) {
			throw new Error('Driver is not ready')
		}
		
		return this._driver
	}
}

export const db = new YandexDatabase()
