import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchTickets, fetchAgents, createTicket, updateTicket, deleteTicket } from '../../api/mockApi';
import type { NewTicket, TicketPatch } from '../../types';

export const loadInitialData = createAsyncThunk(
  'tickets/loadInitialData',

  async () => {
  
    const [tickets, agents] = await Promise.all([
      fetchTickets(),
      fetchAgents(),
    ]);

    return { tickets, agents };
  },
//   {
//     condition: (_, { getState }) => {
//       const status = getState().tickets.status;

//       return status !== 'loading';
//     },
//   }

);
export const addTicket = createAsyncThunk(
  'tickets/addTicket',
  async (input: NewTicket) => {
    return createTicket(input);
  }
);

export const saveTicketUpdate = createAsyncThunk(
  'tickets/saveTicketUpdate',
  async ({
    id,
    patch,
  }: {
    id: string;
    patch: TicketPatch;
  }) => {
    return updateTicket(id, patch);
  }
);

export const removeTicket = createAsyncThunk(
  'tickets/removeTicket',
  async (id: string) => {
    await deleteTicket(id);
    return id;
  }
);