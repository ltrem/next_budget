"use client";

import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const QUERY = gql`
  query GetCategories {
    categories {
      id
      name
      description
    }
  }
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, loading, error } = useQuery(QUERY);
  const pathname = usePathname();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  // TODO: Fix typing so we don't have to manually
  const categories: [{ id: any; name: string; description: string }] =
    data.categories;

  return (
    <section>
      <div className="border-b-2 pb-2 mb-5">
        <ul className="flex flex-wrap">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/dashboard/categories/${category.id}`}
            >
              <li
                className={`link border hover:bg-cyan-100 ${
                  pathname === `/dashboard/categories/${category.id}`
                    ? "bg-cyan-100"
                    : ""
                }`}
              >
                {category.name.trim()}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div>{children}</div>
    </section>
  );
}
