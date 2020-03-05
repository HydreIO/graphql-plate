import gqlTools from 'graphql-tools'
import graphql from 'graphql'
import { DisabledError } from './errors'

const { defaultFieldResolver } = graphql
const { SchemaDirectiveVisitor } = gqlTools

export default class Disabled extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		field.resolve = async (root, arg, ctx, info) => undefined
	}
}
