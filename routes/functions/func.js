const articles = require("../../info_json/articlesTEST.json")

function paginatedResults(page, limit, model) {
  const startIndex = (page - 1) * limit,
    endIndex = page * limit;

  let next = {},
    previus = {},
    conter = [],
    result = [],
    index = [];

  if (endIndex < model.length) {
    next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    previus = {
      page: page - 1,
      limit: limit,
    };
  }

  for (let i = 0; i < model.length; i++) {
    conter.push(i + 1);
  }
  for (let i = 0; i < conter.length; i += limit) {
    let chunk = conter.slice(i, i + limit);
    result.push(chunk);
  }

  for (let i = 0; i < result.length; i++) {
    index.push(i + 1);
  }

  // console.log(endIndex, endIndex);

  let results = model.slice(startIndex, endIndex);

  // console.log(model);

  return { results, next, previus, index };
};


module.exports = { paginatedResults };
