import React from "react";

interface PageHeaderProps {
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

function PageHeader({ title, Icon }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-center">
      <Icon className="mr-2 text-primary" />
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );
}

export default PageHeader;
