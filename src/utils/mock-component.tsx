import { MemoryHistory, createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../components/history-route/history-route';

export function withHostory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHostory = history ?? createMemoryHistory();

  return (
    <HelmetProvider>
      <HistoryRouter history={memoryHostory}>
        {component}
      </HistoryRouter>
    </HelmetProvider>
  );
}
