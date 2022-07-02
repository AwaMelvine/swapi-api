import { PeoplePageType } from "../types";
import { getParamValueFromUrl, getPersonFromApiPersonResult } from "../utils";

const { RESTDataSource } = require('apollo-datasource-rest');

export default class StarWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api';
    this.initialize({});
  }

  async getPeople() {
    const people = await this.get('/people');
    return people.results.map(getPersonFromApiPersonResult);
  }

  async getPeoplePageData(pageNumber: number, count: number): Promise<PeoplePageType> {
    const { count: total, next: nextURL, previous: previousUrl, results } = await this.get(`/people/?page=${pageNumber}`);
    const nextPage = getParamValueFromUrl(nextURL, "page");
    const prevPage = getParamValueFromUrl(previousUrl, "page");
    return {
      count,
      total,
      nextPage: nextPage ? Number(nextPage) : null,
      prevPage: prevPage ? Number(prevPage) : null,
      people: results.map(getPersonFromApiPersonResult)
    };
  }
}