const handlers = require("./handelerFactory");
exports.getAllHolidays = handlers.getAll("dba.qru_holidays");
exports.getHoliday = handlers.getOne("dba.qru_holidays");
exports.createHoliday = handlers.createOne("dba.qru_holidays");
exports.updateHoliday = handlers.updateOne("dba.qru_holidays");
exports.deleteHolidays = handlers.deleteOne("dba.qru_holidays");
