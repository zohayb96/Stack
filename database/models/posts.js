'use strict';

const { STRING, BOOLEAN, INTEGER, TEXT } = require('sequelize');
const db = require('../database');

module.exports = db.define('posts', {
  accepted: {
    type: BOOLEAN,
    defaultValue: false,
  },
  responseRating: {
    type: INTEGER,
  },
  responsePicture: {
    type: TEXT,
    allowNull: false,
  },
  responseText: {
    type: STRING,
  },
});
