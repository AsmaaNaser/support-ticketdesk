import { describe, it, expect } from 'vitest';

import ticketsReducer, {
  optimisticUpdate,
  rollbackUpdate,
  setTickets,
} from '../filters/ticketsSlice';
import type { Ticket } from '../../types';

describe('ticketsSlice', () => {
  it('should rollback an optimistic update', () => {
    const ticket: Ticket = {
      id: 't1',
      title: 'Login issue',
      description: 'Cannot login',
      status: 'open',
      priority: 'high',
      assigneeId: null,
      createdAt: '2026-10-01T09:00:00Z',
    };

    // 1. Add initial ticket
    let state = ticketsReducer(
      undefined,
      setTickets([ticket])
    );

    expect(state.entities['t1']?.status).toBe('open');

    // 2. Optimistic update
    state = ticketsReducer(
      state,
      optimisticUpdate({
        id: 't1',
        patch: { status: 'resolved' },
      })
    );

    expect(state.entities['t1']?.status).toBe('resolved');

    // 3. Rollback
    state = ticketsReducer(
      state,
      rollbackUpdate({
        id: 't1',
        previousPatch: { status: 'open' },
      })
    );

    expect(state.entities['t1']?.status).toBe('open');
  });
});