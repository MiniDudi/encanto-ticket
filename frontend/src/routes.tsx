import { Routes, Route } from "react-router-dom";

import { LoginPage } from "../src/features/auth/pages/LoginPage";
import { RegisterPage } from "../src/features/auth/pages/RegisterPage";
import { TicketListPage } from "../src/features/tickets/pages/TicketListPage";
import { TicketFormPage } from "../src/features/tickets/pages/TicketFormPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/tickets" element={<TicketListPage />} />
      <Route path="/tickets/new" element={<TicketFormPage />} />
      <Route path="/tickets/:id/edit" element={<TicketFormPage />} />
    </Routes>
  );
}