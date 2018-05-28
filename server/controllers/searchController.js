const mongoose = require('mongoose');
const Search = mongoose.model('Search');
const promisify = require('es6-promisify');
const serializeError = require('serialize-error');
const winston = require('winston');

exports.listSearch = async(req, res) => {
    try{
      const search = await Search.find({userName: req.query.userName});
      if(search){
        res.json({ "success": "true", "data": search});
      }else{
        res.json({ "success": "true", "data": []});
      }
    }catch(err){
        winston.log("error", "getSearch");
        res.json({"error": "getSearch", "data": serializeError(err)});
    }
}

exports.searchSearch = async(req, res) => {
    try{
      const search = await Search.find({ userName: req.query.userName, searchName: {$regex: ".*" + req.query.searchName + ".*", $options : "i"}});
      if(search){
        res.json({ "success": "true", "data": search});
      }else{
        res.json({ "success": "true", "data": []});
      }
    }catch(err){
        winston.log("error", "getSearch");
        res.json({"error": "getSearch", "data": serializeError(err)});
    }
}

exports.saveSearch = async(req, res) => {
  try{
    const data = req.body || {}
    const isSearch = await Search.findOne({ userName: req.body.userName, searchName: req.body.searchName});
    if(isSearch){
        winston.log("error", "saveSearch", {"message":"Search name is already present."});
        res.json({"error": "saveSearch", "data": {"message":"Search name is already present."}});
    }else{
        const search = new Search(data);
        await search.save();
        res.json({ "success": "true", "data": search});
    }
  }catch(err){
    winston.log("error", "saveSearch", err);
    res.json({"error": "saveSearch", "data": serializeError(err)});
  }
}

exports.latestSearch = async(req, res) => {
    try{
      const search = await Search.find({ userName: req.query.userName}).sort({$natural:-1}).limit(5);
      if(search){
        res.json({ "success": "true", "data": search});
      }else{
        res.json({ "success": "true", "data": []});
      }
    }catch(err){
        winston.log("error", "getSearch");
        res.json({"error": "getSearch", "data": serializeError(err)});
    }
}

exports.deleteSearch = async(req, res) => {
    try{
      const search = await Search.remove({_id: req.body._id});
      if(search){
        res.json({ "success": "true", "data": search});
      }else{
        res.json({ "success": "true", "data": {}});
      }
    }catch(err){
        winston.log("error", "getSearch");
        res.json({"error": "getSearch", "data": serializeError(err)});
    }
}

exports.updateSearch = async(req, res) => {
  try{
    const data = req.body || {}
    console.log(data);
    console.log(data.searchName);
    console.log(data.userName);
    const isSearch = await Search.findOne({ userName: req.body.userName, searchName: req.body.searchName});
    if(isSearch){
        winston.log("error", "saveSearch", {"message":"Search name is already present."});
        res.json({"error": "saveSearch", "data": {"message":"Search name is already present."}});
    }else{
        const search = await Search.findOne({ _id: req.body._id});
        search.searchName = req.body.searchName;
        await search.save();
        res.json({ "success": "true", "data": search});
    }
  }catch (err) {
    winston.log("error", "mongoError", err);
    res.json({ "error": "mongoError", "data": serializeError(err)});
  }
}