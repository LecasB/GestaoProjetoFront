import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./molecules/LoginForm/LoginForm";
import MessagePage from "./molecules/Messages/MessagePage";
import "./App.scss";
import SignUpForm from "./molecules/SingUpForm/SignUpForm";
import Layout from "./molecules/Layout/Layout";
import TestPage from "./organisms/TestPage";
import UpdateProfileForm from "./molecules/UpdateProfileForm/UpdateProfileForm";
import ItemDetailPage from "./organisms/ItemDetailPage";
import UploadItemPage from "./organisms/UploadItemPage";
import ProfilePage from "./organisms/ProfilePage/ProfilePage";
import BackendLayout from "./organisms/BackOffice/BackendLayout/BackendLayout";
import IndexAdmin from "./organisms/BackOffice/IndexAdmin";
import GerirItem from "./organisms/BackOffice/GerirItems";
import GerirUsers from "./organisms/BackOffice/GerirUsers";
import SeachPage from "./organisms/SearchPage/SearchPage";
import EditItemPage from "./organisms/EditItemPage/EditItemPage";
import AcoesSociaisPage from "./organisms/AcoesSociaisPage/AcoesSociaisPage";

import LeiloesPage from "./organisms/LeiloesPage/LeiloesPage";
import LeilaoDetailsPage from "./organisms/LeilaoDetailsPage/LeilaoDetailsPage";
import AcaoSocialDetails from "./organisms/AcaoSocialDetails/AcaoSocialDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route index path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/mensagens" element={<MessagePage />} />
        <Route path="/test" element={<LeilaoDetailsPage />} />

        <Route path="/" element={<Layout />}>
          <Route path="/index" element={<TestPage />} />
          <Route path="/item" element={<ItemDetailPage />} />
          <Route path="/newItem" element={<UploadItemPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SeachPage />} />
          <Route path="/edit-item" element={<EditItemPage />} />
          <Route path="/acoes-sociais" element={<AcoesSociaisPage />} />
          <Route path="/acao-social" element={<AcaoSocialDetails />} />
          <Route path="/leiloes" element={<LeiloesPage/>}/>
           <Route path="/leilao" element={<LeilaoDetailsPage />} />
        </Route>

        <Route path="/backoffice" element={<BackendLayout />}>
          <Route index element={<IndexAdmin />} />
          <Route path="gerirItems" element={<GerirItem />} />
          <Route path="gerirUsers" element={<GerirUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
