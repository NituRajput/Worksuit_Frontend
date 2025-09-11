import React from 'react';
type RoleType = 'Employee' | 'Super Admin' | 'Human Resource' | 'Manager' | 'Team Lead';
interface RoleBadgeProps {
  role: RoleType;
  className?: string;
}
const RoleBadge: React.FC<RoleBadgeProps> = ({
  role,
  className = ''
}) => {
  const roleConfig = {
    Employee: {
      bg: 'bg-blue-100',
      text: 'text-blue-800'
    },
    'Super Admin': {
      bg: 'bg-purple-100',
      text: 'text-purple-800'
    },
    'Human Resource': {
      bg: 'bg-green-100',
      text: 'text-green-800'
    },
    Manager: {
      bg: 'bg-amber-100',
      text: 'text-amber-800'
    },
    'Team Lead': {
      bg: 'bg-indigo-100',
      text: 'text-indigo-800'
    }
  };
  const config = roleConfig[role];
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text} ${className}`}>
      {role}
    </span>;
};
export default RoleBadge;