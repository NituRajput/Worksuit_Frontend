import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Home,
  Briefcase,
  Calendar,
  FileText,
  Settings,
  LogOut,
  BarChart2,
} from "lucide-react";
import { AiFillHome } from "react-icons/ai";
const Sidebar = () => {
  const location = useLocation();
  const navItems = [
    {
      icon: AiFillHome,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: Users,
      label: "Employees",
      path: "/employees",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      path: "/jobs",
    },
    {
      icon: Calendar,
      label: "Attendance",
      path: "/attendance",
    },
    {
      icon: FileText,
      label: "Payroll",
      path: "/payroll",
    },
    {
      icon: BarChart2,
      label: "Reports",
      path: "/reports",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ];
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-5 border-b border-slate-700">
        <h1 className="text-xl font-bold">HRMS</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-5 py-3 text-sm ${
                    isActive
                      ? "bg-slate-800 border-l-4 border-amber-500"
                      : "hover:bg-slate-800"
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center text-sm text-slate-300 hover:text-white">
          <LogOut size={18} className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
