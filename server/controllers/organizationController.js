const mongoose = require('mongoose');
const Organization = mongoose.model('Organization');
const promisify = require('es6-promisify');
const serializeError = require('serialize-error');
const winston = require('winston');


exports.listOrganization = async(req, res) => {
    try{
      const organization = await Organization.find();
      if(organization){
        res.json({ "success": "true", "data": organization});
      }else{
        res.json({ "success": "true", "data": []});
      }
    }catch(err){
        winston.log("error", "getOrganization");
        res.json({"error": "getOrganization", "data": serializeError(err)});
    }
}

exports.getOrganization = async(req, res) => {
    try{
      const organization = await Organization.findOne({_id: req.query._id});
      if(organization){
        res.json({ "success": "true", "data": organization});
      }else{
        res.json({ "success": "true", "data": {}});
      }
    }catch(err){
        winston.log("error", "getOrganization");
        res.json({"error": "getOrganization", "data": serializeError(err)});
    }
}

exports.deleteOrganization = async(req, res) => {
    try{
      const organization = await Organization.remove({_id: req.body._id});
      if(organization){
        res.json({ "success": "true", "data": organization});
      }else{
        res.json({ "success": "true", "data": {}});
      }
    }catch(err){
        winston.log("error", "getOrganization");
        res.json({"error": "getOrganization", "data": serializeError(err)});
    }
}

exports.saveOrganization = async(req, res) => {
  try{
    const data = req.body || {}
    const organization = new Organization(data);
    await organization.save();
    res.json({ "success": "true", "data": organization});
  }catch(err){
    winston.log("error", "saveProfile", err);
    res.json({"error": "saveProfile", "data": serializeError(err)});
  }
}

exports.updateOrganization = async(req, res) => {
  try{
    const data = req.body || {}
    const organization = await Organization.findOne({ _id: req.body._id });
    organization.country = req.body.country;
    organization.date = req.body.date;
    organization.language = req.body.language;
    organization.name = req.body.name;
    organization.realm = req.body.realm;
    organization.type = req.body.type;
    await organization.save();
    res.json({ "success": "true", "data": organization});
  }catch (err) {
    winston.log("error", "mongoError", err);
    res.json({ "error": "mongoError", "data": serializeError(err)});
  }
}