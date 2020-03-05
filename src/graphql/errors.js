import apolloKoa from 'apollo-server-koa'

const { ApolloError } = apolloKoa

const CODES = {
	DISABLED: 'DISABLED'
}

export const formatError = error => {
	let { message, extensions: { code: type } } = error
	if (type === 'INTERNAL_SERVER_ERROR') {
		console.error(prettyError.render({ ...error, stack: error.extensions?.exception?.stacktrace?.join('\n') }))
		message = 'Oops.. something went wrong! Contact us if this error persist !'
	}
	return { message, type }
}

export class DisabledError extends ApolloError {
	constructor() {
		super('This query is currently disabled', CODES.DISABLED)
	}
}