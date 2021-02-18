const makeNode = (cities, problem, path) => {
  let parent = problem;
  let cost = 0;

  Object.values(parent.connect).map((val) => {
    for (let i = path.length; i > 0; i--) {
      if (path[i] !== undefined) {
        if (val.city === path[i]) {
          cost = val.g + cost;
          Object.values(cities).map((val3) => {
            if (cities === val.city) {
              parent = val3;
              return;
            }
          });
          return;
        }
      }
    }
  });

  Object.keys(problem.connect).map((key) => {
    problem.connect[key] = {
      ...problem.connect[key],
      f: problem.connect[key].g + problem.connect[key].h + cost,
    };
  });
  return problem;
};

export default makeNode;
