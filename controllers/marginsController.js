const handlers = require("./handelerFactory");

exports.getAllMargins = handlers.getAll("dba.qru_margin");
exports.getMargin = handlers.getOne("dba.qru_margin");
exports.createMargin = handlers.createOne("dba.qru_margin");
exports.updateMargin = handlers.updateOne("dba.qru_margin");
exports.deleteMargin = handlers.deleteOne("dba.qru_margin");
