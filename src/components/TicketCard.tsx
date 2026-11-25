import type { Ticket, Agent, TicketStatus, TicketPatch } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { optimisticUpdate, rollbackUpdate } from '../features/filters/ticketsSlice';
import { removeTicket, saveTicketUpdate } from '../features/tickets/ticketsThunks';
import { useState } from 'react';
import { memo } from 'react';
interface TicketCardProps {
  ticket: Ticket;
  agents: Agent[];
}

function TicketCard({ ticket, agents }: TicketCardProps) {

const dispatch = useAppDispatch();
const [isUpdating, setIsUpdating] = useState(false);
const [error, setError] = useState('');

  const assignee = agents.find(
    (agent) => agent.id === ticket.assigneeId
  );

  const priorityLabel =
    ticket.priority.charAt(0).toUpperCase() +
    ticket.priority.slice(1);

  const statusLabel = {
    open: 'Open',
    in_progress: 'In Progress',
    resolved: 'Resolved',
  }[ticket.status];

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(ticket.createdAt));

const handleUpdate = async (patch: TicketPatch) => {
  if (isUpdating) return;

  setIsUpdating(true);
  setError('');

  const previousPatch: TicketPatch = {};

  if (patch.status !== undefined) {
    previousPatch.status = ticket.status;
  }

  if (patch.assigneeId !== undefined) {
    previousPatch.assigneeId = ticket.assigneeId;
  }

  dispatch(
    optimisticUpdate({
      id: ticket.id,
      patch,
    })
  );

  const result = await dispatch(
    saveTicketUpdate({
      id: ticket.id,
      patch,
    })
  );

  if (saveTicketUpdate.rejected.match(result)) {
    dispatch(
      rollbackUpdate({
        id: ticket.id,
        previousPatch,
      })
    );

    setError(result.error.message ?? 'Failed to update ticket');
  }

  setIsUpdating(false);
};


const handleDelete = async () => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this ticket?'
  );

  if (!confirmed) return;

  const result = await dispatch(removeTicket(ticket.id));

  if (removeTicket.rejected.match(result)) {
    setError(result.error.message ?? 'Failed to delete ticket');
  }

};


const deletingTicketId = useAppSelector(
  (state) => state.tickets.deletingTicketId
);

const isDeleting = deletingTicketId !== null;

// const handleStatusChange = async (newStatus: TicketStatus) => {
//   if (isUpdating || newStatus === ticket.status) return;

//   setIsUpdating(true);
//   setError('');

//   const previousStatus = ticket.status;

//   dispatch(
//     optimisticUpdate({
//       id: ticket.id,
//       patch: { status: newStatus },
//     })
//   );

//   const result = await dispatch(
//     saveTicketUpdate({
//       id: ticket.id,
//       patch: { status: newStatus },
//     })
//   );

//   if (saveTicketUpdate.rejected.match(result)) {
//     dispatch(
//       rollbackUpdate({
//         id: ticket.id,
//         previousPatch: { status: previousStatus },
//       })
//     );

//     setError(result.error.message ?? 'Failed to update ticket');
//   }

//   setIsUpdating(false);
// };

  return (
    <div className="ticket-card">

      {/* Title and Priority */}
      <div className="ticket-card-header">
        <h3>{ticket.title}</h3>

        <span className={`priority-badge priority-${ticket.priority}`}>
          {priorityLabel}
        </span>
      </div>

      {/* Description */}
      <p className="ticket-description">
        {ticket.description}
      </p>

      {/* Status */}
      <div className="ticket-status-row">
        <span className={`status-badge status-${ticket.status}`}>
          <span className="status-dot"></span>
          {statusLabel}
        </span>
      </div>

      {/* Assignee and Date */}
      <div className="ticket-details">

        <div className="ticket-assignee">
          <div className="assignee-avatar">
            {assignee
              ? assignee.name
                  .split(' ')
                  .map((name) => name[0])
                  .join('')
              : '👤'}
          </div>

          <span>{assignee?.name ?? 'Unassigned'}</span>
        </div>

        <div className="ticket-date">
          <span>▢</span>
          {formattedDate}
        </div>

      </div>

      {/* Actions */}
      <div className="ticket-actions">

        <select defaultValue="" className="ticket-action-select"
         onChange={(e) => handleUpdate({ status: e.target.value as TicketStatus })} disabled={isUpdating}>
          <option value="" disabled>
            Change Status
          </option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <select defaultValue="" className="ticket-action-select"
         onChange={(e) => handleUpdate({ assigneeId: e.target.value })} disabled={isUpdating}>
          <option value="" disabled>
            Reassign
          </option>

          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
{error && (
  <div className="ticket-update-error" role="alert">
    <span>{error}</span>

    <button
      type="button"
      onClick={() => setError('')}
      aria-label="Dismiss error"
    >
      ×
    </button>
  </div>
)}
        <button type="button" className="ticket-delete-btn" onClick={handleDelete}>
          🗑
        </button>
        {isDeleting && deletingTicketId === ticket.id && (
          <span className="ticket-deleting-indicator">Deleting...</span>
        )}
      </div>

    </div>
  );
}

export default memo(TicketCard);