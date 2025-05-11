import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./molecules/LoginForm/LoginForm";
import MessagePage from "./molecules/Messages/MessagePage";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/mensagens" element={<MessagePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
