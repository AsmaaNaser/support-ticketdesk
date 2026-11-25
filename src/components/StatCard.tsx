interface StatCardProps {
  title: string;
  count: number;
  icon: string;
  variant: 'total' | 'open' | 'progress' | 'resolved';
}

function StatCard({ title, count, icon, variant }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className={`stat-icon stat-icon-${variant}`}>
        {icon}
      </div>

      <div className="stat-content">
        <p className="stat-label">{title}</p>
        <h3 className="stat-count">{count}</h3>
      </div>
    </div>
  );
}

export default StatCard;