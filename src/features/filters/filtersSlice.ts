import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TicketPriority, TicketStatus } from '../../types';

interface FiltersState {
  status: TicketStatus | 'all';
  priority: TicketPriority | 'all';
  assigneeId: string | 'all' | 'unassigned';
  searchText: string;
}

const initialState: FiltersState = {
    status: (localStorage.getItem('statusFilter') as TicketStatus | 'all') || 'all',
    priority: (localStorage.getItem('priorityFilter') as TicketPriority | 'all') || 'all',
    assigneeId: (localStorage.getItem('assigneeFilter') as string | 'all' | 'unassigned') || 'all',
    searchText: localStorage.getItem('searchTextFilter') || '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter(state, action: PayloadAction<TicketStatus | 'all'>) {
      state.status = action.payload;
      localStorage.setItem('statusFilter', action.payload);
    },
    setPriorityFilter(state, action: PayloadAction<TicketPriority | 'all'>) {
      state.priority = action.payload;
      localStorage.setItem('priorityFilter', action.payload);
    },
    setAssigneeFilter(state, action: PayloadAction<string | 'all' | 'unassigned'>) {
      state.assigneeId = action.payload;
      localStorage.setItem('assigneeFilter', action.payload);
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
      localStorage.setItem('searchTextFilter', action.payload);
    },
  },
});

export const { setStatusFilter, setPriorityFilter, setAssigneeFilter, setSearchText } = filtersSlice.actions;
export default filtersSlice.reducer;