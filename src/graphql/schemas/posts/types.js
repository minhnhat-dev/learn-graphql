const { gql } = require('apollo-server-express');

const PostTypes = gql`
    type Post {
        _id: ID
        content: String
        userId: ID
        author: Author
        createdAt: String
    }
    type Author {
        email: String
        name: String
    }
    extend type Query {
        post(id: ID!): Post
        posts(content: String): [Post]
    }
    extend type Mutation {
        createPost(content: String, userId: ID!): Post
        deletePost(id: ID!): Boolean
    }
`;

module.exports = PostTypes;