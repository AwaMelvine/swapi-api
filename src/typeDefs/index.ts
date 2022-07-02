import { gql } from "apollo-server-core";

module.exports = gql`
  type Person {
    id: Int!
    image: String!
    name: String!
    height: Int!
    mass: String!
    gender: String!
    homeworld: String!
  }
  type PeoplePage {
    nextPage: Int
    prevPage: Int
    """ count is the number of people per page """
    count: Int 
    """ total is the number of people available """
    total: Int
    people: [Person!]!
  }
  input SearchInput {
    name: String!
  }
  type Query {
    people: [Person!]!
    peoplePage(currentPage: Int, showing: Int): PeoplePage
    searchPeople(input: SearchInput): [Person!]!
  }
`;
