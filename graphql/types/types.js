const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    allForums: [Forum]
    joinedForumsByUserId(userId: ID = 0): [Forum]
    messagesByForumId(forumId: ID = 0, sortOrder: String = "DESC"): [Message]
    membersByForumId(forumId: ID = 0): [User]
  }
  type Mutation {
    createForum(userId: ID!, name: String!, description: String): createForumResponse
    joinForum(userId: ID!, forumId: ID!): joinForumResponse
    postMessage(userId: ID!, forumId: ID!, content: String!): postMessageResponse
  }
  type User {
    id: ID!,
    firstName: String,
    lastName: String,
    picture: String
  }
  type Forum {
    id: ID!,
    name: String,
    description: String
  }
  type Message {
    id: ID!,
    user: User,
    forumId: ID!,
    timestamp: Int,
    content: String
  }
  type createForumResponse {
    statusText: String,
    forum: Forum
  }
  type joinForumResponse {
    statusText: String
  }
  type postMessageResponse {
    statusText: String,
    message: Message
  }
`;

module.exports = { typeDefs: typeDefs };
