import React from 'react';
import Breadcrumbs from './Breadcrumbs';
type PageHeaderProps = {
  title: string;
  breadcrumbs: Array<{
    label: string;
    path: string;
    isLast: boolean;
  }>;
  actions?: ReactNode;
};
const PageHeader = ({
  title,
  breadcrumbs,
  actions
}: PageHeaderProps) => {
  return <div className="mb-6">
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {actions && <div className="flex space-x-3">{actions}</div>}
      </div>
    </div>;
};
export default PageHeader;