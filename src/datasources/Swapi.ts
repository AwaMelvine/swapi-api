import { PersonType } from "../types";
import { getParamValueFromUrl } from "../utils";

const { RESTDataSource } = require('apollo-datasource-rest');

export default class StarWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api';
    this.initialize({});
  }

  async getPeople() {
    const people = await this.get('/people');
    return people.results.map((person: PersonType) => ({
      name: person.name,
      height: person.height,
      mass: person.mass,
      gender: person.gender,
      homeworld: person.homeworld,
    } as PersonType));
  }

  async getPeoplePageData(pageNumber: number) {
    const { count, next: nextURL, previous: previousUrl, results } = await this.get(`/people/?page=${pageNumber}`);
  
    return {
      count,
      nextPage: getParamValueFromUrl(nextURL, "page"),
      prevPage: getParamValueFromUrl(previousUrl, "page"),
      people: results
    };
  }
}