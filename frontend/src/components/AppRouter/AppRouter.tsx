import {Routes, Route} from 'react-router-dom';
import Layout from '../Layout/Layout';
import Specialists from '../../pages/Specialists/Specialists';
import Skills from '../../pages/Skills/Skills';
import Interviews from '../../pages/Interviews/Interviews';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<div> Main Page</div>} />
                <Route path="/specialists" element={<Specialists />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/interviews" element={<Interviews />} />
                <Route path="*" element={<div>Not found</div>} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
