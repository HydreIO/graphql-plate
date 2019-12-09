import Koa from "koa"
import { ApolloServer, ApolloError } from 'apollo-server-koa'
import { fileLoader, mergeTypes } from "merge-graphql-schemas"
import schema from './graphql'

const debug = require('debug')('gql')
const { PORT = 3000, HOST = "localhost" } = process.env

const formatError = error =>
  ({ message: error.message, type: error.extensions.code }
    |> (_ => (debug(pe.render({ ...error, stack: error.extensions ?.exception ?.stacktrace ?.join('\n') })), _)))

const handleError = error => {
  console.error(error)
  const isApollo = error instanceof ApolloError
  return {
    body: JSON.stringify(isApollo ? { errors: [formatError(apolloError)], data: null } : 'Oops.. something went wrong!'),
    statusCode: isApollo ? 200 : 503
  }
}

const apollo = new ApolloServer({
  schema, async context() {
    user: {
      name: 'foo'
    }
  }
})

const app = new Koa()

void async function () {
  try {
    apollo.applyMiddleware({ app, path: '/gql', formatError, playground: false });
    app.listen(PORT, HOST, () => debug(`🚀 Server ready on http://${HOST}:${PORT}${apollo.graphqlPath}`))
  } catch (e) { handleError(e) }
}()
