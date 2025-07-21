import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import ScrollToTop from "../Router/ScrollToTop";


const MainLayout = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <div>
             <ScrollToTop></ScrollToTop>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-68px)]">
                {isLoading ?
                    <>
                        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-white">
                            <LoadingSpinner />
                        </div>
                    </>
                    :
                    <>
                        <Outlet></Outlet>
                    </>}

            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;


