

import { Fragment, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { publicRoutes } from './routes';
import { Toaster } from 'react-hot-toast';


function App() {
    return (
        <>
            <Router>
                <ScrollToTop>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            let Layout = route.layout;

                            const Page = route.component;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page title={route.title} category={route.category} />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </ScrollToTop>
                <Toaster />
            </Router>
        </>
    );
}

export default App;
