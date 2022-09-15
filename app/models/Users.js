const pool = require("../../config/dbConnection");

module.exports = class Users {
  static _table_users = "users";
  static _table_role = "role";
  static _table_permissions = "permissions";
  static _table_role_permissions = "role_permissions";
  static _table_users_role = "users_role";

  static findOneForLogin({ username }) {
    const statement = {
      text: `
      select u.username, u.fullname, u.password, r.role_name, rp.role_id, jsonb_agg(permission_name) as permission_details
      from ${Users._table_users} u 
      join ${Users._table_users_role} ur on (u.username = ur.username)
      join ${Users._table_role} r on (ur.role_id = r.id)
      join ${Users._table_role_permissions} rp on (r.id = rp.role_id)
      join ${Users._table_permissions} p on (rp.permission_id = p.id)
      
      where u.username = $1 and  u.active = '1' and ur.active = '1' and r.active = '1' and rp.active = '1' and p.active = '1'
      group by u.username, u.fullname, u.password, r.role_name, rp.role_id;
      `,
      values: [username],
    };
    return pool.query(statement);
  }

  static createUser({ username,fullname='',password,role_name }) {
    const statement = {
      text: 
      `call create_user($1,$2,$3,$4);`,
      values: [username,fullname,password,role_name],
    };
    return pool.query(statement);
  }
};
