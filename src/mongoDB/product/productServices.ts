import Product from "./product.monodb-model";

export const createProductService = async (data: {
  product_name: string;
  price: Number;
  description: string;
  created_at: Date;
  category: string;
}) => {
  const createProduct = new Product(data);
  return await createProduct.save();
};

export const getProductService = async () => {
  return await Product.find();
};

export const getProductByIdService = async (id: string) => {
  return await Product.findById(id);
};

export const updateProductService = async (data: {
  product_id: string;
  product_name: string;
  price: Number;
}) => {
  const updatedData = await Product.updateOne(
    { _id: data.product_id },
    { $set: { product_name: data.product_name, price: data.price } }
  );
  return updatedData;
};

export const deleteProductService = async (id: string) => {
  return await Product.deleteOne({ _id: id });
};
