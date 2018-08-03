'use strict';

const Users = require('./models/users');
const Posts = require('./models/posts');
const OriginalPost = require('./models/originalPost');
const db = require('./database');

OriginalPost.belongsTo(Users, { as: 'issuedFrom' });
Posts.belongsTo(Users, { as: 'issuedTo' });
Posts.belongsTo(OriginalPost, { as: 'response' });

module.exports = {
  db,
  Posts,
  OriginalPost,
  Users,
};
