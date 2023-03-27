import * as dotenv from 'dotenv'
import path from 'path'

process.env.YDB_SERVICE_ACCOUNT_KEY_FILE_CREDENTIALS = path.resolve(__dirname, '../../config/yc-account.json')

dotenv.config()
