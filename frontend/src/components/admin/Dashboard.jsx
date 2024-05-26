import Sidebar from "./Sidebar";
import Groups from "./Groups";
import Chat from "./Chat";

const Dashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Groups />
        <Chat />
      </div>
    </>
  );
};

export default Dashboard;
