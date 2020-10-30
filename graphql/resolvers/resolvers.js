const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const data = require('../../fixtures/fixtures.json');

const helpers = {
  userExists: function(userId) {
    return !!_.find(data.users, user => {
      return user.id === userId;
    });
  },
  forumExists: function(forumId) {
    return !!_.find(data.forums, forum => {
      return forum.id === forumId;
    });
  },
  isJoinedForum: function(userId, forumId) {
    return !!_.find(data.joinedForums, joinedForum => {
      return joinedForum.userId === userId && joinedForum.forumId === forumId;
    });
  }
};

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    allForums: () => data.forums,
    joinedForumsByUserId: (parent, args, context, info) => {
      return _.filter(data.forums, forum => {
        return helpers.isJoinedForum(args.userId, forum.id);
      });
    },
    messagesByForumId: (parent, args, context, info) => {
      let messages = _.cloneDeep(data.messages);

      let userMessages = _.filter(messages, message => {
        if(message.forumId === args.forumId) {
          let user = _.find(data.users, user => {
            return user.id === message.userId;
          });
          if(user) {
            message.user = user;
          }

          return true;
        } else {
          return false;
        }
      });

      return _.sortBy(userMessages, message => {
        if(args.sortOrder === 'DESC') {
          return -message.timestamp;
        } else {
          return message.timestamp;
        }
      });
    },
    membersByForumId: (parent, args, context, info) => {
      return _.filter(data.users, user => {
        return helpers.isJoinedForum(user.id, args.forumId);
      });
    },
  },
  Mutation: {
    createForum: (parent, args, context, info) => {
      if(!helpers.userExists(args.userId)) {
        return {statusText: `No user found with ID: ${args.userId}`};
      }

      let forumId = uuidv4();

      let forum = {
        id: forumId,
        name: args.name,
        description: args.description
      };
      data.forums.push(forum);

      let joinedForum = {
        id: uuidv4(),
        userId: args.userId,
        forumId: forumId
      };
      data.joinedForums.push(joinedForum);
    
      return {statusText: "Forum successfully created; user successfully joined forum", forum: forum};
    },
    joinForum: (parent, args, context, info) => {
      if(!helpers.userExists(args.userId)) {
        return {statusText: `No user found with ID: ${args.userId}`};
      }
      if(!helpers.forumExists(args.forumId)) {
        return {statusText: `No forum found with ID: ${args.forumId}`};
      }

      let isJoinedForum = helpers.isJoinedForum(args.userId, args.forumId);

      if(isJoinedForum) {
        return {statusText: "User already a member of forum"};
      }

      let joinedForum = {
        id: uuidv4(),
        userId: args.userId,
        forumId: args.forumId
      };
      data.joinedForums.push(joinedForum);

      return {statusText: "User successfully joined forum"};
    },
    postMessage: (parent, args, context, info) => {
      if(!helpers.userExists(args.userId)) {
        return {statusText: `No user found with ID: ${args.userId}`};
      }
      if(!helpers.forumExists(args.forumId)) {
        return {statusText: `No forum found with ID: ${args.forumId}`};
      }

      let isJoinedForum = helpers.isJoinedForum(args.userId, args.forumId);

      if(!isJoinedForum) {
        return {statusText: "User not a member of forum"};
      }

      let message = {
        id: uuidv4(),
        userId: args.userId,
        forumId: args.forumId,
        timestamp: _.floor(new Date().getTime() / 1000),
        content: args.content
      };
      data.messages.push(message);

      let user = _.find(data.users, user => user.id === args.userId);

      return {statusText: "Message post successful", message: _.assign({user: user}, message)};
    }
  }
};

module.exports = resolvers;
