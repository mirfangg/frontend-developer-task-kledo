import React from "react";
import { IconChevronRight } from "./Icons";

interface BreadcrumbProps {
  province: string;
  regency: string;
  district: string;
}

interface CrumbItem {
  label: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  province,
  regency,
  district,
}) => {
  const crumbs: CrumbItem[] = [
    { label: "Indonesia" },
    ...(province ? [{ label: province }] : []),
    ...(regency ? [{ label: regency }] : []),
    ...(district ? [{ label: district }] : []),
  ];

  return (
    <nav
      className="breadcrumb flex items-center flex-wrap gap-1.5 px-10 py-3.5 bg-white border-b border-slate-200"
      aria-label="breadcrumb"
    >
      {crumbs.map((crumb, i) => (
        <span key={crumb.label} className="flex items-center gap-1.5">
          {i > 0 && <IconChevronRight />}
          <span
            className={
              i === crumbs.length - 1
                ? "text-[13px] font-semibold text-blue-500"
                : "text-[13px] text-slate-500"
            }
          >
            {crumb.label}
          </span>
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
