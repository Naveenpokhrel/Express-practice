import { get } from "http";
import pool from "./mysql-client";
import { json } from "stream/consumers";
export const SqlProductModel = {
  // get all products
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
  },
  // get products by id
  async getById(product_id: number) {
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM products WHERE product_id = ?",
      [product_id]
    );
    if (rows.length === 0) {
      throw new Error(`Product with id ${product_id} not found`);
    }
    return rows[0];
  },
  //delete product by id
  async DeleteById(id: number) {
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM products WHERE product_id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw new Error(`Product with id ${id} not found`);
    }

    await pool.query("DELETE FROM products WHERE product_id = ?", [id]);

    console.log(`Product with id ${id} deleted successfully`);
    return;
  },
  //update product by id
  async UpdateProduct(
    product_id: number,
    p0: { product_name: string; price: any; description: any; stock_quantity: any }
  ) {
    try {
      console.log("Checking if product exists with id:", product_id);
      const [rows] = await pool.query<any[]>(
        "SELECT * FROM products WHERE product_id = ?",
        [product_id]
      );

      if (rows.length === 0) {
        throw new Error(`Product with id ${product_id} not found`);
      }

      const updatedProduct = {
        ...rows[0],
        product_name: p0.product_name,
        description: p0.description,
        price: p0.price,
        stock_quantity: p0.stock_quantity,
      };

      console.log("Updating product with data:", updatedProduct);
      console.log("exceuting the code", p0.product_name);
      await pool.query(
        "UPDATE products SET product_name= ?, description=?, price= ?, stock_quantity= ? WHERE product_id = ?",
        [
          p0.product_name,
          p0.description,
          p0.price,
          p0.stock_quantity,
          product_id,
        ]
      );

      console.log(`Product with id ${product_id} updated successfully`);

      return updatedProduct;
    } catch (error) {
      console.error("SQL error:", error);
      throw error;
    }
  },
  //Create New Product
  async createProductDetails(p0: {
    product_name: string;
    price: number;
    description: string;
    stock_quantity: number;
  }) {
    const { product_name, price, description, stock_quantity } = p0;
    const [result] = await pool.query<any>(
      "INSERT INTO products (product_name, price, description,stock_quantity) VALUES (?, ?, ?, ?)",
      [product_name, price, description, stock_quantity]
    );
    const newProductId = result.insertId;
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM products WHERE product_id = ?",
      [newProductId]
    );

    return rows[0];
  },
};
