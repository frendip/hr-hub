import AppRouter from './components/AppRouter/AppRouter';
import './styles/styles.module.scss';
import {BrowserRouter} from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
