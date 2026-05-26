import { configureStore } from "@reduxjs/toolkit";
import { usuariosReducer } from "./slices/usuariosSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/es/storage";
import { authReducer } from "./slices/authSlice";
import { setStore } from "../service/storeHelp";
import { categoriasReducer } from "./slices/categoriasSlice";
import { proveedoresReducer } from "./slices/proveedoresSlice";
import { productosReducer } from "./slices/productosSlice";
import { ventasReducer } from "./slices/ventasSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"],
};

const persistAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    usuarios: usuariosReducer,
    auth: persistAuthReducer,
    categorias: categoriasReducer,
    proveedores: proveedoresReducer,
    productos: productosReducer,
    ventas: ventasReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
setStore(store);

export const persistor = persistStore(store);
