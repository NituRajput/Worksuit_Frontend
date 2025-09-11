import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
type BreadcrumbItem = {
  label: string;
  path: string;
  isLast: boolean;
};
type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};
const Breadcrumbs = ({
  items
}: BreadcrumbsProps) => {
  return <div className="flex items-center text-sm text-gray-500 mb-4">
      <Link to="/" className="flex items-center hover:text-amber-500">
        <Home size={14} className="mr-1" />
        Home
      </Link>
      {items.map((item, index) => <Fragment key={index}>
          <ChevronRight size={14} className="mx-2" />
          {item.isLast ? <span className="text-gray-900 font-medium">{item.label}</span> : <Link to={item.path} className="hover:text-amber-500">
              {item.label}
            </Link>}
        </Fragment>)}
    </div>;
};
export default Breadcrumbs;