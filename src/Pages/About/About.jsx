import HeroSection from "./HeroSection";
import OurCommitment from "./OurCommitment";
import { Helmet } from "react-helmet-async";
                              

const About = () => {
    return (
        <div>
           
        <Helmet>
        <title>About | Shopping Spider</title>
        </Helmet>
            <div className="py-10">
                <HeroSection/>
            </div>

            <div>
                <OurCommitment/>
            </div>
        </div>
    );
};

export default About;