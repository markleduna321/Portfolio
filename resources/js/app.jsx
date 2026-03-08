import './bootstrap';
import '../css/app.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store/store';
import PortfolioPage from './app/pages/portfolio/page';

const root = createRoot(document.getElementById('root'));

root.render(
    <StrictMode>
        <Provider store={store}>
            <PortfolioPage />
        </Provider>
    </StrictMode>
);
