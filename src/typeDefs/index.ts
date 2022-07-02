import { gql } from "apollo-server-core";

module.exports = gql`
  type Person {
    name: String!
    height: Int!
    mass: String!
    gender: String!
    homeword: String!
  }
  type Query {
    people: [Person!]!
  }
`;
