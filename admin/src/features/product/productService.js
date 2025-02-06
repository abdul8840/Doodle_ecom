import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/getall-product`);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/create-product`, product, config);

  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/get-product/${id}`, config);

  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}product/update-product/${product.id}`,
    {
      title: product.productData.title,
      slug: product.productData.slug,
      shortDescription: product.productData.shortDescription,
      description: product.productData.description,
      mrp_price: product.productData.mrp_price,
      selling_price: product.productData.selling_price,
      category: product.productData.category,
      brand: product.productData.brand,
      quantity: product.productData.quantity,
      sold: product.productData.sold,
      sizes: product.productData.sizes,
      tags: product.productData.tags,
      newarrivedproduct: product.productData.newarrivedproduct,
      trendingproduct: product.productData.trendingproduct,
      featuredproduct: product.productData.featuredproduct,
      color: product.productData.color,
      images: product.productData.images,
      ratings: product.productData.ratings,
      totalrating: product.productData.totalrating,
    },
    config
  );

  return response.data;
};

const deleteproduct = async (id) => {
  const response = await axios.delete(`${base_url}product/delete-product/${id}`, config);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteproduct,
  updateProduct,
  getProduct,
};

export default productService;
