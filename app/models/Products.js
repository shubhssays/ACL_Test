const { pool } = require("../../config/dbConnection");

module.exports = class Products {
  static _table_users = "products";

  static create({ product_name, price, quantity = null, created_by }) {
    const statement = {
      text: `insert into products (product_name, price, quantity, created_by) values ($1,$2,$3,$4)`,
      values: [product_name, price, quantity, created_by],
    };
    return pool.query(statement);
  }

  static fetch() {
    const statement = {
      text: `select id, product_name, price, quantity from products where active = '1';`,
    };
    return pool.query(statement);
  }

  static update({ product_name, price, quantity, created_by, id }) {
    const statement = {
      text: `update products set product_name = $1, price = $2, quantity = $3, updated_at = now(), created_by = $4  where id = $5 and active = '1';`,
      values: [product_name, price, quantity, created_by, id],
    };
    return pool.query(statement);
  }

  static delete({ created_by, id }) {
    const statement = {
      text: `update products set active = '0', updated_at = now(), created_by = $1 where active = '1' and id = $2;`,
      values: [created_by, id],
    };
    return pool.query(statement);
  }
};
