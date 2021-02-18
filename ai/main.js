import RBFS from "./functions/rbfs";

const main = (cities) => {
  let path = [];
  let parent = [];
  let alternative = Infinity;
  let counter = 0;
  RBFS(cities, cities[0], Infinity, path, alternative, counter, parent);
};

export default main;
