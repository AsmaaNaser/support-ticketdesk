import StatCard from './StatCard';
import { useAppSelector } from '../app/hooks';
import { selectTicketCounts } from '../features/filters/ticketsSlice';

function SummaryBar() {
      const counts = useAppSelector(selectTicketCounts);
  return (
    <div className="summary-bar">
      <StatCard
        title="Total Tickets"
        count={counts.total}
        icon="▱"
        variant="total"
      />

      <StatCard
        title="Open"
        count={counts.open}
        icon="●"
        variant="open"
      />

      <StatCard
        title="In Progress"
        count={counts.inProgress}
        icon="●"
        variant="progress"
      />

      <StatCard
        title="Resolved"
        count={counts.resolved}
        icon="●"
        variant="resolved"
      />
    </div>
  );
}

export default SummaryBar;