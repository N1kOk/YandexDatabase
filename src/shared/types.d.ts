declare global {
	namespace NodeJS {
		interface ProcessEnv {
			YDB_ENDPOINT: string
			YDB_DATABASE: string
			YDB_SERVICE_ACCOUNT_KEY_FILE_CREDENTIALS: string
		}
	}
}

export {}
