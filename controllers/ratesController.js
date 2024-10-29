const handlers = require("./handelerFactory");

exports.getAllRates = handlers.getAll("dba.qru_rates");
exports.getRates= handlers.getOne("dba.qru_rates");
exports.createRates = handlers.createOne("dba.qru_rates");
exports.updateRates = handlers.updateOne("dba.qru_rates");
exports.deleteRates = handlers.deleteOne("dba.qru_rates");
