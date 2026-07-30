import { Routes, Route } from "react-router-dom";

import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { TicketListPage } from "../features/tickets/pages/TicketListPage";
import { TicketFormPage } from "../features/tickets/pages/TicketFormPage";
import { PrivateRoute } from "./private_routes";
import { PublicRoute } from "./public_routes";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

      <Route path="/tickets" element={<PrivateRoute><TicketListPage /></PrivateRoute>} />
      <Route path="/tickets/new" element={<PrivateRoute><TicketFormPage /></PrivateRoute>} />
      <Route path="/ticket/:id/edit" element={<PrivateRoute><TicketFormPage /></PrivateRoute>} />
    </Routes>
  );
}

