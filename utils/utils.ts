import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";

export const COLORS = [
  "#F80404",
  "#048444",
  "#042444",
  "#1738F3",
  "#FC5C04",
  "#93437C",
];

export const getRandomName = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: " ",
    style: "capital",
  });

export const getUniqueValue = (
  existing: string[],
  getId: (index: number) => string = (index: number) => `id${index}`
) => {
  let index = 0;
  let id;
  do {
    id = getId(index);
    index += 1;
  } while (existing.includes(id));
  return id;
};
