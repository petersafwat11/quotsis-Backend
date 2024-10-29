const handlers = require("./handelerFactory");

exports.getAllClients = handlers.getAll("dba.qru_partner");
exports.getClient = handlers.getOne("dba.qru_partner");
exports.createClients = handlers.createOne("dba.qru_partner");
exports.updateClient = handlers.updateOne("dba.qru_partner");
exports.deleteClient = handlers.deleteOne("dba.qru_partner");
