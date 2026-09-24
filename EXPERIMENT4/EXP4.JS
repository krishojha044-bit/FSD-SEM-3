const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

// Schema
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// Resolver
const root = {
    hello: () => "Hello World!"
};

// GraphQL API
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/graphql");
});