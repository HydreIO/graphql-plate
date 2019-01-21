import Koa from "koa"
import { ApolloServer } from "apollo-server-koa"
import { fileLoader, mergeTypes } from "merge-graphql-schemas"

import { join } from "path"

import resolvers from "./resolvers"

const { PORT = 3000, HOST = "localhost" } = process.env

const typeDefs = mergeTypes(
  fileLoader(join(__dirname, "schema"), { recursive: true }),
  {
    all: true
  }
)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  async context({ request, h }) {
    return {
      user: {
        name: "HydreIO"
      }
    }
  }
})

const app = new Koa()
server.applyMiddleware({ app })

app.listen(PORT, HOST, () =>
  console.log(`🚀  Server ready at http://${HOST}:${PORT}${server.graphqlPath}`)
)
