import React from 'react';
import LatestProduct from './HomeSection/LatestProduct';
import Service from './HomeSection/Service';
import BrandPartner from './HomeSection/BrandPartner';
import Slider from './Slider/Slider';
import CollectionBanner from './HomeSection/CollectionCard';
import FAQ from './HomeSection/FAQ';
import { Helmet } from 'react-helmet-async'; 

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Shopping Spider</title>
                <meta name="description" content="Discover the latest fashion collections, top-notch services, and trusted brands at Shopping Spider." />
            </Helmet>
            <Slider/>
            <CollectionBanner/>
            <LatestProduct></LatestProduct>
            <Service></Service>
            <FAQ></FAQ>
            <BrandPartner></BrandPartner>
            
        </div>
    );
};

export default Home;