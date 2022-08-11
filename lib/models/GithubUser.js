const pool = require('../utils/pool');

module.exports = class GithubUser {
  id;
  email;
  avatar;
  username;

  constructor({ id, username, email, avatar }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatar = avatar;
  }

  static async findByUsername(username) {
    const { rows } = await pool.query(
      `SELECT * FROM github_users
      WHERE username = $1`,
      [username]
    );
    
    if (!rows[0]) return null;
    return new GithubUser(rows[0]);
  }
};
