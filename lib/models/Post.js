const pool = require('../utils/pool');

module.exports = class Post {
  id;
  content;
  user_id;

  constructor(row) {
    this.id = row.id;
    this.content = row.content;
    if (row.user_id) this.user_id = row.user_id;
    if (row.username) {
      this.username = row.username;
      this.avatar = row.avatar;
    }
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT github_posts.id, content, username, avatar FROM github_posts
      INNER JOIN github_users
      ON github_users.id = github_posts.user_id`
    );
    return rows.map((row) => new Post(row));
  }

  static async insert({ content }, userId) {
    const { rows } = await pool.query(
      `INSERT INTO github_posts (content, user_id)
      VALUES ($1, $2) RETURNING *`,
      [content, userId]
    );
    return new Post(rows[0]);
  }
};
