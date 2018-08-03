'use strict';

const { STRING, BOOLEAN, INTEGER, TEXT } = require('sequelize');
const db = require('../database');

module.exports = db.define('originalPosts', {
  text: {
    type: STRING,
  },
  rating: {
    type: INTEGER,
  },
  picture: {
    type: TEXT,
  },
});