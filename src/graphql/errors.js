import { ApolloError } from 'apollo-server-koa'

const CODES = {
	DISABLED: 'DISABLED'
}

export class DisabledError extends ApolloError {
	constructor() {
		super('This query is currently disabled', CODES.DISABLED)
	}
}