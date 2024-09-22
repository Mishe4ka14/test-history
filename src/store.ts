import { configureStore } from '@reduxjs/toolkit';
import slidesReducer from '../src/features/slider-slice'; 

// создаем корневой редьюьсер
const store = configureStore({
  reducer: {
    slides: slidesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;