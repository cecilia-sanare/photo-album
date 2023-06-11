/* istanbul ignore file */
// No meaningful way of testing this file, hence why we're ignoring it in coverage.
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
