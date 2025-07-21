import { Helmet } from "react-helmet-async";
import RechartsAndCalendar from "../../../components/Dashboard/AdminHome/AllStatistics/RechartsAndCalendar";
import UserCount from "../../../components/Dashboard/AdminHome/AllStatistics/UserCount";


const Dashboard = () => {
    return (
        <div className="w-11/12 mx-auto py-10">
            <Helmet>
                    <title>Dashboard | Shopping Spider</title>
            </Helmet>
            <UserCount/>
            <RechartsAndCalendar/>
        </div>
    );
};

export default Dashboard;