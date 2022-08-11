module.exports = class Post {
  id;
  content;
  user_id;

  constructor(row) {
    this.id = row.id;
    this.content = row.content;
    this.user_id = row.user_id;
  }
};
