import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import CreateUserPage from "./pages/CreateUser";
import MeetsPage from "./pages/Meets";
import MeetPage from "./pages/Meet";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<CreateUserPage />} />
        <Route path="/meets" element={<MeetsPage />} />
        <Route path="/meet" element={<MeetPage />} />
        {/* <Route path="/course" element={<Meets />} />
            <Route path="/live" element={<Live />} />
            <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
