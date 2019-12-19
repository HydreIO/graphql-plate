import Koa from "koa"
import { fileLoader, mergeTypes } from "merge-graphql-schemas"
import { apollo } from './apollo'

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

const app = new Koa()

void async function () {
  try {
    const server = app.listen(PORT, HOST, () => debug(`
🚀 Server ready on http://${HOST}:${PORT}${apollo.graphqlPath}
🚀 Subscriptions ready on ws://${HOST}:${PORT}${apollo.graphqlPath}`))

    apollo.applyMiddleware({ app, path: '/gql', formatError, playground: false });
    apollo.installSubscriptionHandlers(server);
  } catch (e) { handleError(e) }
}()
