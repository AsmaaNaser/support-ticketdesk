import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Agent } from '../../types';
import { loadInitialData } from '../tickets/ticketsThunks';
import type { RootState } from '../../app/store';

interface AgentsState {
  items: Agent[];
}

const initialState: AgentsState = {
  items: [],
};

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setAgents(state, action: PayloadAction<Agent[]>) {
      state.items = action.payload;
    },
  },
   extraReducers: (builder) => {
    builder.addCase(loadInitialData.fulfilled, (state, action) => {
      state.items = action.payload.agents;
    });
  },
});


export const selectAllAgents = (state: RootState) => state.agents.items;

export const { setAgents } = agentsSlice.actions;

export default agentsSlice.reducer;