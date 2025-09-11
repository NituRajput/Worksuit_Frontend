import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Upload, Download, Search, Filter, Mail, UserCircle } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmployeeTable, { Employee } from '../../components/employees/EmployeeTable';
// Mock data for employees
const mockEmployees: Employee[] = [{
  id: '1001',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  name: 'John Doe',
  designation: 'Team Lead',
  email: 'john.doe@example.com',
  role: 'Employee',
  reportingTo: 'Sarah Johnson',
  status: 'active'
}, {
  id: '1002',
  avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  name: 'Jane Smith',
  designation: 'Human Resource',
  email: 'jane.smith@example.com',
  role: 'Human Resource',
  reportingTo: 'Michael Brown',
  status: 'active'
}, {
  id: '1003',
  avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  name: 'Michael Brown',
  designation: 'Manager',
  email: 'michael.brown@example.com',
  role: 'Super Admin',
  reportingTo: 'CEO',
  status: 'active'
}, {
  id: '1004',
  avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  name: 'Sarah Johnson',
  designation: 'Manager',
  email: 'sarah.johnson@example.com',
  role: 'Manager',
  reportingTo: 'Michael Brown',
  status: 'active'
}, {
  id: '1005',
  avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  name: 'David Wilson',
  designation: 'Employee',
  email: 'david.wilson@example.com',
  role: 'Employee',
  reportingTo: 'Sarah Johnson',
  status: 'inactive'
}, {
  id: '1006',
  avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
  name: 'Emily Davis',
  designation: 'Employee',
  email: 'emily.davis@example.com',
  role: 'Employee',
  reportingTo: 'John Doe',
  status: 'active'
}, {
  id: '1007',
  avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
  name: 'Robert Miller',
  designation: 'Employee',
  email: 'robert.miller@example.com',
  role: 'Employee',
  reportingTo: 'John Doe',
  status: 'on-leave'
}, {
  id: '1008',
  avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
  name: 'Jennifer Taylor',
  designation: 'Human Resource',
  email: 'jennifer.taylor@example.com',
  role: 'Human Resource',
  reportingTo: 'Michael Brown',
  status: 'active'
}, {
  id: '1009',
  avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
  name: 'Thomas Anderson',
  designation: 'Team Lead',
  email: 'thomas.anderson@example.com',
  role: 'Employee',
  reportingTo: 'Sarah Johnson',
  status: 'active'
}, {
  id: '1010',
  avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
  name: 'Lisa White',
  designation: 'Employee',
  email: 'lisa.white@example.com',
  role: 'Employee',
  reportingTo: 'Thomas Anderson',
  status: 'pending'
}];
const EmployeesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const breadcrumbs = [{
    label: 'Employees',
    path: '/employees',
    isLast: true
  }];
  const filteredEmployees = mockEmployees.filter(employee => employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || employee.email.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div>
      <PageHeader title="Employees" breadcrumbs={breadcrumbs} />
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Link to="/employees/add">
              <Button leftIcon={<UserPlus size={16} />} variant="primary">
                Add Employee
              </Button>
            </Link>
            <Button leftIcon={<Mail size={16} />} variant="outline">
              Invite Employee
            </Button>
            <Button leftIcon={<Upload size={16} />} variant="outline">
              Import
            </Button>
            <Button leftIcon={<Download size={16} />} variant="outline">
              Export
            </Button>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input type="text" placeholder="Start typing to search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm" />
            </div>
            <Button leftIcon={<Filter size={16} />} variant="outline">
              Filters
            </Button>
          </div>
        </div>
      </Card>
      <Card>
        <EmployeeTable data={filteredEmployees} />
      </Card>
    </div>;
};
export default EmployeesList;