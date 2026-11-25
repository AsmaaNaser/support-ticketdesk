import TicketCard from './TicketCard';
import { useAppSelector } from '../app/hooks';
import { selectAllAgents } from '../features/filters/agentsSlice';
import { selectFilteredTickets, selectTicketCounts } from '../features/filters/ticketsSlice';

function TicketList() {
     const tickets = useAppSelector(selectFilteredTickets);
     const counts = useAppSelector(selectTicketCounts);
     const agents = useAppSelector(selectAllAgents);
  return (
    <>
      <div className="ticket-list">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            agents={agents}
          />
        ))}
      </div>

      <p className="ticket-list-footer">
        Showing {tickets.length} of {counts.total} tickets
      </p>
    </>
  );
}

export default TicketList;
