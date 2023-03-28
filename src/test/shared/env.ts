import * as dotenv from 'dotenv'
import path from 'path'

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			YDB_ENDPOINT: string
			YDB_DATABASE: string
			YDB_SERVICE_ACCOUNT_KEY_FILE_CREDENTIALS: string
		}
	}
}

process.env.YDB_SERVICE_ACCOUNT_KEY_FILE_CREDENTIALS = path.resolve(__dirname, '../../.ydb/editor.json')

dotenv.config()
