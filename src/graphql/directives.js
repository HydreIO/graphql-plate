import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver } from 'graphql'
import { DisabledError } from './errors'

export default class Disabled extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		field.resolve = async (root, arg, ctx, info) => throw new DisabledError()
		}
	}
