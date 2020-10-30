## changes to GraphQL schema

```
  type Query {
    allForums: [Forum]
    joinedForumsByUserId(userId: ID = 0): [Forum]
    messagesByForumId(forumId: ID = 0, sortOrder: String = "DESC"): [Message]
    membersByForumId(forumId: ID = 0): [User]
  }

  type Mutation {
    createForum(userId: ID!, name: String!, description: String, private: Boolean = false): CreateForumResponse
    joinForum(userId: ID!, forumId: ID!): JoinForumResponse
    joinForumRequest(userId: ID!, forumId: ID!): JoinForumRequestResponse
    resolveJoinForumRequest(joinForumRequestInfoId: ID!, accept: Boolean!): ResolveJoinForumRequestResponse
    postMessage(userId: ID!, forumId: ID!, content: String!): PostMessageResponse
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    picture: String
  }

  type Forum {
    id: ID!
    name: String
    description: String
    private: Boolean!
    adminUserIds: [ID]
  }

  type JoinForumRequestInfo {
    id: ID!
    userId: ID!
    forumId: ID!
  }

  type Message {
    id: ID!
    user: User
    forumId: ID!
    timestamp: Int
    content: String
  }

  type CreateForumResponse {
    statusText: String
    forum: Forum
  }

  type JoinForumResponse {
    statusText: String
  }
  
  type JoinForumRequestResponse {
    statusText: String
    joinForumRequestInfo: JoinForumRequestInfo
  }

  type ResolveJoinForumRequestResponse {
    statusText: String
  }

  type PostMessageResponse {
    statusText: String
    message: Message
  }
```