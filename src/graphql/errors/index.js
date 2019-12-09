import { ApolloError } from 'apollo-server-koa'

const CODES = {
	LOCAL_ONLY: 'LOCAL_ONLY'
}

export class LocalOnlyError extends ApolloError {
	constructor() {
		super('This query is only accessible in development mode', CODES.LOCAL_ONLY)
	}
}