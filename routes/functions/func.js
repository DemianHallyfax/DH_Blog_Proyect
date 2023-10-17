function paginatedResults(page, limit, model) {
  const startIndex = (page - 1) * limit,
    endIndex = page * limit,
    results = {};

  let next = {},
    previus = {};

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

  let conter = [],
    result = [];

  for (let i = 0; i < model.length; i++) {
    conter.push(i + 1);
  }
  for (let i = 0; i < conter.length; i += limit) {
    let chunk = conter.slice(i, i + limit);
    result.push(chunk);
  }

  let index = [];
  for (let i = 0; i < result.length; i++) {
    index.push(i + 1);
  }

  results.results = model.slice(startIndex, endIndex);

  return { results, next, previus, index };
}
module.exports = { paginatedResults };
