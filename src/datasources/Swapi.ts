const { RESTDataSource } = require('apollo-datasource-rest');

export default class StarWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api';
    this.initialize({});
  }

  async getPeople() {
    const people = await this.get('/people');
    return people.results.map((person: any) => ({
      name: person.name,
      height: person.height,
      mass: person.mass,
      gender: person.gender,
      homeword: person.homeworld,
    }));
  }

  async getPageData(pageNumber: number) {
    return this.get(`/people/?page=${pageNumber}`);
  }
}