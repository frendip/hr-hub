import {Routes, Route} from 'react-router-dom';
import Layout from '../Layout/Layout';
import Specialists from '../../pages/Specialists/Specialists';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<div> Main Page</div>} />
                <Route path="/specialists" element={<Specialists />} />
                <Route path="*" element={<div>Not found</div>} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
