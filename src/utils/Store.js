import React, { createContext, useReducer } from "react";
import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("user") && JSON.parse(Cookies.get("user")),
  products: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN": {
      const user = action.payload;
      Cookies.set("user", JSON.stringify(user));
      return { ...state, user: user };
    }
    case "USER_LOGOUT": {
      return { ...state, user: null };
    }
    case "SET_PRODUCTS": {
      return { ...state, products: action.payload };
    }
    case "DELETE_PRODUCT": {
      const updatedProducts = state.products.filter(
        (product) => product._id !== action.payload
      );
      return { ...state, products: updatedProducts };
    }
    default:
      return state;
  }
}

export const Store = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
