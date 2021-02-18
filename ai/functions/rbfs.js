import makeNode from "../tools/makeNode";

const RBFS = (cities, node, f_limit, path, alternative, counter, parent) => {
  counter += 1;
  let visited = false;
  let best;
  let expandedNode = makeNode(cities, node, path);
  let arr = [];
  path.push(node.city);
  console.log("🚀 ~ file: rbfs.js ~ line 9 ~ RBFS ~ path", path);
  if (cities[Object.keys(cities).length - 1].city === node.city) {
    console.log("🚀 ~ file: rbfs.js ~ line 13 ~ RBFS ~ path", path);
    return path;
  }
  if (node.connect === {}) {
    return false;
  }
  if (f_limit > alternative) {
    f_limit = alternative;
  }
  Object.keys(expandedNode.connect).map((k1) => {
    if (f_limit > expandedNode.connect[k1].f) {
      f_limit = expandedNode.connect[k1].f;
      node = expandedNode.connect[k1].city;
      visited = true;
    } else {
      arr.push(expandedNode.connect[k1].f);
    }
  });
  if (!visited) {
    f_limit = alternative;
    parent.push(path.pop());
    if (parent.length > 1) {
      path.push(parent.shift());
      parent.pop();
    }
    Object.values(cities).map((k4) => {
      Object.values(k4.connect).map((k5) => {
        if (k5.f === alternative) {
          node = k5.city;
        }
      });
    });
  }
  alternative = Math.min(...arr);
  Object.values(cities).map((k2) => {
    if (k2.city === node) {
      best = k2;
    }
  });
  RBFS(
    cities,
    best,
    Math.min(f_limit, alternative),
    path,
    alternative,
    counter,
    parent
  );
};

export default RBFS;
