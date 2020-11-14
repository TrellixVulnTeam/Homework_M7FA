const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const db = require('../database/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users = db.get('users');
  res.status(200).json({
    status: 'succes',
    data: users,
  }); 

}).post('/', function(req, res, next) {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).json({
      status: 'error',
      error: 'req body cannot be empty',
    });
  }

  let usersId = shortid.generate();
  db.get('users').push({...req.body, usersId }).write();

  res.status(200).json({
    status: 'succes',
    data: usersId,
  });

}).put('/:id', function(req, res, next, ID, newUser) {
  db.get('users').find({ id: ID }).assign(newUser).write();

}).delete('/:id', function(req, res, next, ID) {
  let idUser = req.id;
  db.get('users').remove({ id: idUser}).write();
});

module.exports = router;
