# How to use

## Install package from GitHub

`npm install N1kOk/YandexDatabase`

## Set environment variables

```dotenv
YDB_ENDPOINT= # database endpoint
YDB_DATABASE= # database location
YDB_SERVICE_ACCOUNT_KEY_FILE_CREDENTIALS= # path to the service account key file from 'yc iam key create --folder-id <folder_id> --service-account-name <sa_name> --output ~/.ydb/sa_name.json'
```

## Create class

```ts
import { snakeToCamelCaseConversion, TypedData, withTypeOptions } from 'ydb-sdk'

@withTypeOptions({ namesConversion: snakeToCamelCaseConversion })
export class User extends TypedData {
	// @ts-ignore
	public id: number
	// @ts-ignore
	public name: string
	// @ts-ignore
	public phone: string
	// @ts-ignore
	public isDeleted: boolean
}
```

_or_

```ts
import { snakeToCamelCaseConversion, TypedData, withTypeOptions } from 'ydb-sdk'

@withTypeOptions({ namesConversion: snakeToCamelCaseConversion })
export class User extends TypedData {
	public id: number | undefined
	public name: string | undefined
	public phone: string | undefined
	public isDeleted: boolean | undefined
}
```

## Execute query

```ts
import { db } from 'N1kOk/YandexDatabase'

const SELECT_QUERY = 'SELECT * FROM users'

await db.executeQuery(SELECT_QUERY) // return void
await db.executeQuery(SELECT_QUERY, User) // return User
await db.executeQuery(SELECT_QUERY, User, true) // return User[]
```
