export type PersonType = {
  name: string;
  height: number;
  mass: string;
  gender: string;
  homeworld: string;
};

export type PeoplePageType = {
  nextPage: number | null;
  prevPage: number | null;
  count: number;
  people: PersonType[];
};