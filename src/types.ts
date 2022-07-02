export type PersonType = {
  name: string;
  height: number;
  mass: string;
  gender: string;
  homeworld: string;
};

export type PeoplePageType = {
  nextPage: number;
  prevPage: number;
  count: number;
  people: PersonType[];
};