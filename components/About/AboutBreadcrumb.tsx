import Breadcrumb from "@/components/Breadcrumb";

export default function AboutBreadcrumb() {
  return (
    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
  );
}
