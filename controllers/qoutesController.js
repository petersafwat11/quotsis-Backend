const handlers = require("./handelerFactory");

exports.getAllQuotes = handlers.getAll("dba.qru_quote");
exports.getQuote = handlers.getOne("dba.qru_quote");
exports.createQuotes = handlers.createOne("dba.qru_quote");
exports.updateQuote = handlers.updateOne("dba.qru_quote");
exports.deleteQuote = handlers.deleteOne("dba.qru_quote");
