import {
    createSlice,
    createEntityAdapter,
    type PayloadAction,
    createSelector,
} from '@reduxjs/toolkit';

import type { Ticket, TicketPatch } from '../../types';
import { addTicket, loadInitialData, removeTicket } from '../tickets/ticketsThunks';
import type { RootState } from '../../app/store';

// 1. Create adapter
const ticketsAdapter = createEntityAdapter<Ticket>();

// 2. Define loading status
type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

// 3. Define additional state
type RequestStatus = 'idle' | 'pending';
interface TicketsExtraState {
    status: LoadStatus;
    error: string | null;
    lastSyncedAt?: String;

    createStatus: RequestStatus;
    createError: string | null;

    deletingTicketId: string | null;
    deleteError: string | null;
    removeStatus: RequestStatus;
    removeError: string | null;
}

// 4. Create initial state
const initialState = ticketsAdapter.getInitialState<TicketsExtraState>({
    status: 'idle',
    error: null,
    createStatus: 'idle',
    createError: null,
    deletingTicketId: null,
    deleteError: null,
    removeStatus: 'idle',
    removeError: null,
});

// 5. Create slice
const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,

    reducers: {
        setTickets(state, action: PayloadAction<Ticket[]>) {
            ticketsAdapter.setAll(state, action.payload);
        },
        optimisticUpdate(
            state,
            action: PayloadAction<{
                id: string;
                patch: TicketPatch;
            }>
        ) {
            ticketsAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload.patch,
            });
        },
        rollbackUpdate(
            state,
            action: PayloadAction<{
                id: string;
                previousPatch: TicketPatch;
            }>
        ) {
            ticketsAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload.previousPatch,
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadInitialData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })

            .addCase(loadInitialData.fulfilled, (state, action) => {
                ticketsAdapter.setAll(state, action.payload.tickets);

                state.status = 'succeeded';
                state.error = null;
                state.lastSyncedAt = new Date().toISOString();
            })

            .addCase(loadInitialData.rejected, (state, action) => {
                state.status = 'failed';

                state.error =
                    action.error.message ?? 'Failed to load tickets.';
            })


            .addCase(addTicket.pending, (state) => {
                state.createStatus = 'pending';
                state.createError = null;
                state.lastSyncedAt = new Date().toISOString();
            })

            .addCase(addTicket.fulfilled, (state, action) => {
                ticketsAdapter.addOne(state, action.payload);

                state.createStatus = 'idle';
                state.createError = null;
                state.lastSyncedAt = new Date().toISOString();
            })

            .addCase(addTicket.rejected, (state, action) => {
                state.createStatus = 'idle';

                state.createError =
                    action.error.message ?? 'Failed to create the ticket.';
            })

            .addCase(removeTicket.pending, (state, action) => {
                state.deletingTicketId = action.meta.arg;
                state.deleteError = null;
            })

        .addCase(removeTicket.fulfilled, (state, action) => {
            ticketsAdapter.removeOne(state, action.payload);

            state.deletingTicketId = null;
            state.deleteError = null;
            state.lastSyncedAt = new Date().toISOString();
        })

        .addCase(removeTicket.rejected, (state, action) => {
            state.deletingTicketId = null;

            state.deleteError =
                action.error.message ?? 'Failed to delete ticket';
        });
},
});

export const ticketsSelectors = ticketsAdapter.getSelectors<RootState>(
    (state) => state.tickets
);

export const selectAllTickets = ticketsSelectors.selectAll;
export const selectFilters = (state: RootState) =>
    state.filters;

export const selectFilteredTickets = createSelector(
    [selectAllTickets, selectFilters],

    (tickets, filters) => {
        const search = filters.searchText.trim().toLowerCase();

        return tickets.filter((ticket) => {
            const matchesStatus =
                filters.status === 'all' ||
                ticket.status === filters.status;

            const matchesPriority =
                filters.priority === 'all' ||
                ticket.priority === filters.priority;

            const matchesAssignee =
                filters.assigneeId === 'all' ||
                (filters.assigneeId === 'unassigned'
                    ? ticket.assigneeId === null
                    : ticket.assigneeId === filters.assigneeId);

            const matchesSearch =
                ticket.title.toLowerCase().includes(search) ||
                ticket.description.toLowerCase().includes(search);

            return (
                matchesStatus &&
                matchesPriority &&
                matchesAssignee &&
                matchesSearch
            );
        });
    }
);


export const selectTicketCounts = createSelector(
    [selectAllTickets],

    (tickets) => {
        return tickets.reduce(
            (counts, ticket) => {
                counts.total += 1;

                if (ticket.status === 'open') {
                    counts.open += 1;
                }

                if (ticket.status === 'in_progress') {
                    counts.inProgress += 1;
                }

                if (ticket.status === 'resolved') {
                    counts.resolved += 1;
                }

                return counts;
            },
            {
                total: 0,
                open: 0,
                inProgress: 0,
                resolved: 0,
            }
        );
    }
);

// 6. Export actions
export const { setTickets } = ticketsSlice.actions;

export const { optimisticUpdate, rollbackUpdate } = ticketsSlice.actions;

// 7. Export reducer
export default ticketsSlice.reducer;