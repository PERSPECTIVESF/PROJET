import { Routes, Route } from 'react-router-dom';
import Apprenants from '../pages/Apprenants';
import Entreprises from '../pages/Entreprises';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/apprenants" element={<Apprenants />} />
      <Route path="/entreprises" element={<Entreprises />} />
      <Route path="/" element={<Apprenants />} />
    </Routes>
  );
}