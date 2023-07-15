import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '@/app/index.tsx';

import { store } from '@/store/index.ts';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(
    <Provider store={store}>
        <App />
    </Provider>
);