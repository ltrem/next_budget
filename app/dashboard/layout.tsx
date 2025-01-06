"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const sidebarItem = ["Invoices", "Users", "Categories"];

  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <ul>
          {sidebarItem.map((sidebarItemTitle) => (
            <li key={sidebarItemTitle}>
              <Link
                className={`link ${
                  pathname.search(
                    `/dashboard/${sidebarItemTitle.toLowerCase()}`
                  ) > -1
                    ? "active"
                    : ""
                }`}
                href={`/dashboard/${sidebarItemTitle.toLowerCase()}`}
              >
                {sidebarItemTitle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
