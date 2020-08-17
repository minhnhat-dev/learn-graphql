const { gql } = require('apollo-server-express');

const PostTypes = gql`

    extend type Subscription {
        messageAdded: Message
    }

    type Message {
        userId: ID!,
        message: String
        status: Status
    }

    enum Status {
        CREATED
        UPDATED
        DELETED
    }

    extend type Query {
        message(id: ID!): Message
        messages(ids: [ID]): [Message]
    }

    extend type Mutation {
        createMessage(message: String, userId: ID!): Message
        deleteMessage(id: ID!): Boolean
    }
`;

module.exports = PostTypes;