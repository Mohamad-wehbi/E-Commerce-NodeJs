class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    if (this.queryString) {
      const queryStringObj = { ...this.queryString };
      const excludesFields = ["sort", "fields", "page", "limit", "searchBy"];
      excludesFields.forEach((field) => delete queryStringObj[field]);
      if (queryStringObj) {
        const queryStr = JSON.stringify(queryStringObj);
        queryStr.replace(/\b(gt|gte|lt|lte)\b/, (match) => `$${match}`);
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
      }
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort();
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search() {
    if (this.queryString.searchBy && this.queryString.search) {
      const searchingFields = this.queryString.searchBy.split(",");
      const regex = { key: new RegExp(this.queryString.search, "i") };
      const arr = searchingFields.map((prop) => {
        const newRegexKey = {};
        newRegexKey[prop] = regex["key"];
        return newRegexKey;
      });
      const query = {};
      query.$or = arr;
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  paginate(countDocuments) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;
    const numberOfPages = Math.ceil(countDocuments / limit);
    const pagination = { page, limit, numberOfPages };
    if (endIndex < countDocuments) pagination.next = page + 1;
    if (skip > 0) pagination.prev = page - 1;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }
}

module.exports = ApiFeatures;
