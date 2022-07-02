import {Context} from '../../index';

module.exports = {
  Query: {
    people: async (_: any, __: any, { startWarsAPI }: Context) => {
      const people =  await startWarsAPI.getPeople();
      return people;
    },
    peoplePage: async (_: any, { currentPage }: any, { startWarsAPI }: Context) => {
      const people =  await startWarsAPI.getPeoplePageData(currentPage);
      return people;
    },
  },
}