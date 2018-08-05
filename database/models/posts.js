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
    defaultValue:
      'https://uploads-ssl.webflow.com/57e5747bd0ac813956df4e96/5aebae14c6d254621d81f826_placeholder.png',
  },
  responseText: {
    type: STRING,
  },
});
