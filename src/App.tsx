import Header from './components/Header';
import SummaryBar from './components/SummaryBar';
import TicketFilters from './components/TicketFilters';
import TicketList from './components/TicketList';
import CreateTicketModal from './components/CreateTicketModal';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { loadInitialData } from './features/tickets/ticketsThunks';
import './App.css';
import { useTheme } from './context/ThemeContext';

function App() {
  const dispatch = useAppDispatch();

  const status = useAppSelector(
    (state) => state.tickets.status
  );

  const error = useAppSelector(
    (state) => state.tickets.error
  );
  useEffect(() => {
     void dispatch(loadInitialData());
  }, [dispatch]);

  if (status === 'idle' || status === 'loading') {
  return (
    <div className="loading-screen">
      <h2>Loading tickets...</h2>
    </div>
  );
}

if (status === 'failed') {
  return (
    <div className="error-screen">
      <h2>Unable to load tickets</h2>

      <p role="alert">
        {error ?? 'Something went wrong.'}
      </p>

      <button
        type="button"
        onClick={() => void dispatch(loadInitialData())}
      >
        Retry
      </button>
    </div>
  );
}

const { theme } = useTheme();


  return (
    <div className={`app ${theme}`}>

      <Header />

      <div className="app-layout">

        <div className="dashboard-layout">

          <main className="main-content">

            <div className="dashboard-header">
              <div className="dashboard-title">
                <h2>Tickets</h2>
                <p>Manage and track customer support requests</p>
              </div>
            </div>

            <SummaryBar />
            <TicketFilters />
            <TicketList />

          </main>

          <CreateTicketModal />

        </div>
      </div>
    </div>
  );
}


// function App() {
//   const dispatch = useAppDispatch();

//   const status = useAppSelector(
//     (state) => state.tickets.status
//   );

//   const error = useAppSelector(
//     (state) => state.tickets.error
//   );

//   useEffect(() => {
//     void dispatch(loadInitialData());
//   }, [dispatch]);

//   const handleRetry = () => {
//     void dispatch(loadInitialData());
//   };

//   if (status === 'idle' || status === 'loading') {
//     return (
//       <div>
//         <h1>Support Ticket Desk</h1>
//         <p>Loading tickets...</p>
//       </div>
//     );
//   }

//   if (status === 'failed') {
//     return (
//       <div>
//         <h1>Support Ticket Desk</h1>

//         <p role="alert">
//           {error ?? 'Something went wrong.'}
//         </p>

//         <button onClick={handleRetry}>
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Support Ticket Desk</h1>

//       <p>Tickets loaded successfully!</p>
//     </div>
//   );
// }

// function App() {
//   const dispatch = useAppDispatch();

//   const status = useAppSelector((state) => state.filters.status);

//   return (
//     <div>
//       <h1>Support Ticket Desk</h1>

//       <p>Selected status: {status}</p>

//       <button onClick={() => dispatch(setStatusFilter('open'))}>
//         Open
//       </button>

//       <button onClick={() => dispatch(setStatusFilter('resolved'))}>
//         Resolved
//       </button>

//       <button onClick={() => dispatch(setStatusFilter('all'))}>
//         All
//       </button>
//     </div>)
// }

export default App
