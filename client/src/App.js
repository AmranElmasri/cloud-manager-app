import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import ManagerApp from "./pages/ManagerApp/ManagerApp";
import Statistics from "./pages/Statistics/Statistics";
import axios from "./apis/index";

function App() {
  // setInterval(async() => {
  //   await axios.get('/update-statistics');
  // }, 5000);

  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Navigate to="/manager" />} />
        <Route path="/manager" element={<ManagerApp />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Sidebar>
  );
}

export default App;
