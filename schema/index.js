const { gql } = require ('apollo-server');

const typeDefs = gql`
    type User {
        id: Int!
        first_name: String!
        last_name: String!
        company: Company
        email: String!
    }
    type Company {
        id: Int!
        name: String!
    }
    type Lead {
        id: Int!
        name: String!
        first_name: String!
        last_name: String!
        email: String!
        phone_number: String!
        sale_valuation: Int!
        rental_valuation: Int!
        company: Company,    
    }
    type Query {
        profile: User
        restrictedEndPoint: String!
        books: [Book]
    }
    type Mutation {
        login(email: String!, password: String!): String!
        createUser(email: String!, first_name: String!, last_name: String!, password: String!, company_id: String!): User!
        createCompany(name: String!): Company!
    }
    
      # This "Book" type can be used in other type declarations.
      type Book {
        title: String
        author: String
      }
    
     
`;

module.exports = typeDefs;