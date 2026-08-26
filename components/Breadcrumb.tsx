import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string; // no href = current (active) page
  /** Optional override for the active item text colour (Tailwind class). */
  activeColor?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Extra Tailwind classes applied to the outer wrapper div (e.g. "pt-20 sm:pt-24"). */
  className?: string;
}

/**
 * Generic Breadcrumb component.
 *
 * Usage:
 *   <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blogs" }]} />
 *   <Breadcrumb className="pt-20 sm:pt-24" items={[...]} />
 */
export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <div className={`py-4 sm:py-6 text-center border-b border-gray-100 ${className}`}>
      <nav
        className="inline-flex items-center gap-2 font-roboto text-xs sm:text-sm"
        aria-label="Breadcrumb"
      >
        {items.map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-2">
            {idx > 0 && <span className="text-[#5B6472]">&gt;</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="text-[#5B6472] hover:text-[#004560] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={`font-medium ${item.activeColor ?? "text-[#004560]"}`}>
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
