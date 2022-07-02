import { gql } from "apollo-server-core";

module.exports = gql`
  type Person {
    name: String!
    height: Int!
    mass: String!
    gender: String!
    homeworld: String!
  }
  type PeoplePage {
    nextPage: Int
    prevPage: Int
    count: Int
    people: [Person!]!
  }
  type Query {
    people: [Person!]!
    peoplePage(currentPage: Int): PeoplePage
  }
`;
