import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import EmployeesList from './pages/employees/EmployeesList';
import AddEmployee from './pages/employees/AddEmployee';
export function App() {
  return <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EmployeesList />} />
          <Route path="employees" element={<EmployeesList />} />
          <Route path="employees/add" element={<AddEmployee />} />
        </Route>
      </Routes>
    </Router>;
}