import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CreateRepair from "../pages/CreateRepair";
import RepairDetails from "../pages/RepairDetails";
import React from "react"
import Track from "../pages/Track";
import Signup from '../pages/Signup'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}></Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/new"
          element={
            <ProtectedRoute>
              <CreateRepair />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/repair/:id"
          element={
            <ProtectedRoute>
              <RepairDetails />
            </ProtectedRoute>
          }
        />

      <Route path="/track/:public_id" element={<Track />} />
      </Routes>
    </BrowserRouter>
  );
}
