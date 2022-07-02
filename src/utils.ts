import { PersonType } from "./types";
const fetch = require('node-fetch');

export const getParamValueFromUrl = (url: string, param: string) => {
  if (!url) {
    return null;
  }
  const urlObj = new URL(url);
  const value = urlObj.searchParams.get(param);
  return value;
};

const getPersonIdFromUrl = (url?: string) => {
  if (!url) {
    throw new Error(`Invalid url of ${url}`);
  }
  const value = url.split('/').reverse()[1];
  return Number(value);
};

export const getPersonFromApiPersonResult = async (person?: any): Promise<PersonType> => {
    const id = getPersonIdFromUrl(person.url);
    const image = await getPersonImageFromId(id);
    
  return {
    id,
    image,
    name: person.name,
    height: person.height,
    mass: person.mass,
    gender: person.gender,
    homeworld: person.homeworld,
  }
};

/*
  WARNING: This function uses an ID from the main swapi API
  to query a totally different API for that character's image.
  I had to do this because the main API doesn't provide images.
  While I have mannually checked to ensure that the IDs coincide
  with the character in question, I cannot guarantee that this will
  be the case for all characters. This is fine for now because I only
  use the image for design and aesthetic purposes on the frontend side.
*/
const getPersonImageFromId = async (id: number) => {
  const response = await fetch(`https://akabab.github.io/starwars-api/api/id/${id}.json`);
  const value = await response.json();
  return value.image;
};
