export type PersonType = {
  id: number;
  name: string;
  image: string;
  height: number;
  mass: string;
  gender: string;
  homeworld: string;
  url?: string;
};

export type PeoplePageType = {
  nextPage: number | null;
  prevPage: number | null;
  count: number;
  total: number;
  people: PersonType[];
};