'use strict';

const {
  STRING,
  BOOLEAN,
  INTEGER,
  TEXT,
  FLOAT,
  ARRAY,
  DOUBLE,
} = require('sequelize');
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
  location: ARRAY(DOUBLE),
});
