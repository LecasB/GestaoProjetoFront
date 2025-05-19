import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./molecules/LoginForm/LoginForm";
import MessagePage from "./molecules/Messages/MessagePage";
import "./App.scss";
import SignUpForm from "./molecules/SingUpForm/SignUpForm";
import FileUpload from "./atoms/FileUpload/FileUpload";
import Layout from "./molecules/Layout/Layout";
import TestPage from "./organisms/TestPage";
import UpdateProfileForm from "./molecules/UpdateProfileForm/UpdateProfileForm";
import ItemDetailPage from "./organisms/ItemDetailPage";
import UploadItemPage from "./organisms/UploadItemPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route index path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/mensagens" element={<MessagePage />} />
        <Route path="/test" element={<UpdateProfileForm />} />

        <Route path="/" element={<Layout />}>
          <Route path="/index" element={<TestPage />} />
          <Route path="/item" element={<ItemDetailPage />} />
          <Route path="/newItem" element={<UploadItemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
