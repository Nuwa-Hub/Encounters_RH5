import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import CreateUserPage from "./pages/CreateUser";
import MeetsPage from "./pages/Meets";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<CreateUserPage />} />
        <Route path="/meets" element={<MeetsPage />} />
        {/* <Route path="/course" element={<Meets />} />
            <Route path="/live" element={<Live />} />
            <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
