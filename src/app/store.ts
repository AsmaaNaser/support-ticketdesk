import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../features/filters/filtersSlice';
import agentsReducer from '../features/filters/agentsSlice';
import ticketsReducer from '../features/filters/ticketsSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    agents: agentsReducer,
    tickets: ticketsReducer,

  },
});