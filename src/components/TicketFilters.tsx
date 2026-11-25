import { useState, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectFilters } from '../features/filters/ticketsSlice';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { setSearchText } from '../features/filters/filtersSlice';
import { useDispatch } from 'react-redux';
import { setStatusFilter, setPriorityFilter, setAssigneeFilter } from '../features/filters/filtersSlice';
function TicketFilters() {
    const dispatch = useDispatch();
    const filters = useAppSelector(selectFilters);
    const [searchInput, setSearchInput] = useState(filters.searchText);
    
    const debouncedSearch = useDebouncedValue(searchInput, 300);
    useEffect(() => {
          dispatch(setSearchText(debouncedSearch));
    }, [debouncedSearch, dispatch]);

  return (
    <div className="ticket-filters">

      <div className="ticket-search">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search by title or description..."
          aria-label="Search tickets"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <select className="filter-select" defaultValue={filters.status} onChange={(e) => dispatch(setStatusFilter(e.target.value as 'all' | 'open' | 'in_progress' | 'resolved'))}>
        <option value="all">All Statuses</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>

      <select className="filter-select" defaultValue={filters.priority} onChange={(e) => dispatch(setPriorityFilter(e.target.value as 'all' | 'low' | 'medium' | 'high' | 'urgent'))}>
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>

      <select className="filter-select" defaultValue={filters.assigneeId} onChange={(e) => dispatch(setAssigneeFilter(e.target.value as 'all' | 'unassigned' | string))}>
        <option value="all">All Agents</option>
        <option value="a1">Mona Adel</option>
        <option value="a2">Karim Fathy</option>
        <option value="a3">Salma Nabil</option>
        <option value="a4">Youssef Hany</option>
      </select>

      <button className="clear-filters" type="button" onClick={() => {
        dispatch(setStatusFilter('all')); 
        dispatch(setPriorityFilter('all'));
        dispatch(setAssigneeFilter('all'));
        setSearchInput('');
        dispatch(setSearchText(''));
        Array.from(document.querySelectorAll('.filter-select')).forEach(select => (select as HTMLSelectElement).value = 'all');
      }}>
        Clear filters
    
      </button>

    </div>
  );
}

export default TicketFilters;