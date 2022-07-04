import {Context} from '../../index';

module.exports = {
  Query: {
    people: async (_: any, __: any, { startWarsAPI }: Context) => {
      const people =  await startWarsAPI.getPeople();
      return people;
    },
    peoplePage: async (_: any, { currentPage, showing }: { currentPage: number, showing: number }, { startWarsAPI }: Context) => {
    const people =  await startWarsAPI.getPeoplePageData(currentPage, showing ?? 10);
      return people;
    },
    personById: async (_: any, { personId }: { personId: number }, { startWarsAPI }: Context) => {
      const person =  await startWarsAPI.getPersonById(personId);
      return person;
    },
    searchPeople: async (_: any, { name }: { name: string }, { startWarsAPI }: Context) => {
    const people =  await startWarsAPI.searchPeople(name);
      return people;
    },
  },
}