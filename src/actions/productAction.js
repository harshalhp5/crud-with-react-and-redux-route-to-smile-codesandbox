import * as actionTypes from "./actionType";

export const createProduct = (product) => {
  return {
    type: actionTypes.CREATE_NEW_PRODUCT,
    product: product
  };
};

export const setProduct = (products) => {
  return {
    type: actionTypes.SET_PRODUCTS,
    products: products
  };
};

export const deleteProduct = (id) => {
  return {
    type: actionTypes.DELETE_PRODUCT,
    id: id
  };
};
export const updateProduct = (product) => {
  return {
    type: actionTypes.UPDATE_PRODUCT,
    product: product
  }
};