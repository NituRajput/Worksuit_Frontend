import React from 'react';
type StatusType = 'active' | 'inactive' | 'pending' | 'on-leave';
interface StatusDotProps {
  status: StatusType;
  withLabel?: boolean;
  className?: string;
}
const StatusDot: React.FC<StatusDotProps> = ({
  status,
  withLabel = true,
  className = ''
}) => {
  const statusConfig = {
    active: {
      color: 'bg-green-500',
      label: 'Active'
    },
    inactive: {
      color: 'bg-gray-400',
      label: 'Inactive'
    },
    pending: {
      color: 'bg-yellow-500',
      label: 'Pending'
    },
    'on-leave': {
      color: 'bg-blue-500',
      label: 'On Leave'
    }
  };
  const config = statusConfig[status];
  return <div className={`flex items-center ${className}`}>
      <div className={`w-2 h-2 rounded-full ${config.color}`}></div>
      {withLabel && <span className="ml-2 text-sm">{config.label}</span>}
    </div>;
};
export default StatusDot;