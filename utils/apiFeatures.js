class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // filter() {
  //   const queryObj = { ...this.queryString };
  //   const excludedFields = ["page", "sort", "limit", "fields"];
  //   excludedFields.forEach((el) => delete queryObj[el]);

  //   if (Object.keys(queryObj).length) {
  //     this.query.where(queryObj);
  //   }

  //   return this;
  // }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "searchValue", "or"];
    excludedFields.forEach((el) => delete queryObj[el]);
  
    // Basic filtering with direct matches
    Object.keys(queryObj).forEach((key) => {
      this.query.where(key, queryObj[key]);
    });
  
    // Handle "or" and "searchValue" if provided
    if (this.queryString.or && this.queryString.searchValue) {
      const searchFields = this.queryString.or; // Assuming an array, e.g., ["name", "description"]
      const searchValue = this.queryString.searchValue;
  
      // Build an OR condition for each specified field with the search value
      this.query.andWhere((qb) => {
        searchFields.forEach((field) => {
          qb.orWhereILike(field, `%${searchValue}%`);
        });
      });
    }
  
    return this;
  }
  
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query.orderByRaw(sortBy);
    } else {
      this.query.orderBy("id", "asc");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query.select(fields);
    } else {
      this.query.select("*");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query.offset(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures; 
