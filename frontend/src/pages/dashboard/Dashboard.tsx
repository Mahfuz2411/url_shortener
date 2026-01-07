import { Outlet } from "react-router";

const Dashboard = () => {
    return (
        <>
            <h1>Dashboard Layout</h1>
            <Outlet />
        </>
    );
}

export default Dashboard;