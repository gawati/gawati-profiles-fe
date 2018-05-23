const mongoose = require('mongoose');
const Search = mongoose.model('Search');
const promisify = require('es6-promisify');
const serializeError = require('serialize-error');
const winston = require('winston');


exports.listSearch = async(req, res) => {
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
    const search = new Search(data);
    await search.save();
    res.json({ "success": "true", "data": search});
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