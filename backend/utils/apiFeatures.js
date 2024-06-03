class ApiFeatutes {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    //*  Searching the value by Keyword 
    search() {
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword, //* Check String From Database
                $options: "i" //* Case Insensitive here
            }
        } : {}

        this.query.find({ ...keyword })
        return this;
    };

    //* Filltering The Value By Price
    filter() {
        const queryStrCopy = { ...this.queryStr };
        const removeFields = ["keyword", "limit", "page"];
        removeFields.forEach(field => delete queryStrCopy[field]);
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`); //* Adding Doller Sign 
        this.query.find(JSON.parse(queryStr));
        return this;
    };

    //* Pagination 
    paginate(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
};

module.exports = ApiFeatutes;
