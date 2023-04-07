import * as actionTypes from "../actions/actionType";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.CREATE_NEW_PRODUCT:
      let array = [...state];
      array.unshift(action.product);
      return array;
    case actionTypes.SET_PRODUCTS:
      return action.products;
    case actionTypes.DELETE_PRODUCT:
      return state.filter((data) => data.id !== action.id);
    case actionTypes.UPDATE_PRODUCT:
      const updatedProductIndex = state.findIndex(
        (product) => product.id === action.product.id
      );
      if (updatedProductIndex === -1) {
        return state;
      }
      const updatedProducts = [...state];
      updatedProducts.splice(updatedProductIndex, 1);
      updatedProducts.unshift(action.product);
      return updatedProducts;
    default:
      return state;
  }
};
