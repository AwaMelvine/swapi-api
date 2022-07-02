import {Context} from '../../index';

module.exports = {
  Query: {
    people: async (_: any, __: any, { startWarsAPI }: Context) => {
      const people =  await startWarsAPI.getPeople();
      return people;
    },
  },
}