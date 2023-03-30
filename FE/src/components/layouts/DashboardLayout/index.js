import classNames from 'classnames/bind';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Orders from '../../../pages/DashboardPages/Orders';
import StoreProducts from '../../../pages/DashboardPages/StoreProducts';
import { dashboardRoutes } from '../../../routes';
import Header from '../DefaultLayout/Header';
import style from './DashboardLayout.module.scss';
import HeaderDB from './HeaderDB';
import Sidebar from './Sidebar';
import {Toaster} from 'react-hot-toast'
import { AuthContext } from '../../../context/userContext';

const cx = classNames.bind(style);

function DashboardLayout() {


    const contentRef = useRef(null);

    const [contentOver, setContentOver] = useState(false);

    const [userState, dispatch] = useContext(AuthContext);


    useLayoutEffect(() => {

        const element = contentRef.current;
        
        const handleOver = () => {

            

            if (element.scrollTop >= 100) {
                setContentOver(true)
            } else if (element.scrollTop < 50) {
                setContentOver(false)
            }
        };
        element.addEventListener('scroll', handleOver);

        return () => element.removeEventListener('scroll', handleOver)
    }, [contentRef]);

    const location = useLocation();
    useEffect(() => {
        contentRef.current.scrollTo(0, 0);
    }, [location]);


    return (
        <div className={cx('wrapper')}>
            {/* <Header /> */}
            <HeaderDB />

            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar />
                </div>
                <div ref={contentRef} className={cx('content')}>
                    <Routes>
                        {
                            dashboardRoutes.map((route, index) => {
                                const Component = route.component;
                                return (
                                    <Route path={route.path} element={<Component isScrollOver={contentOver} />} key={index} />
                                )
                            }
                            )
                        }
                        {/* <Route path="/products" element={<StoreProducts />} />
                        <Route path="/orders" element={<Orders />} /> */}
                    </Routes>
                </div>
            </div>
{/* 
            <Toaster /> */}
            
        </div>
    );
}

export default DashboardLayout;
