"use client";

import { use } from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query GetCategories($id: Int4 = "") {
    categories(where: { id: { _eq: $id } }) {
      id
      name
      description
    }
  }
`;

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { data, loading, error } = useQuery(QUERY, {
    variables: { id: slug },
    pollInterval: 500,
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (!data.categories || data.categories.length <= 0) {
    return <div>No result(s)</div>;
  }

  const categories: [{ name: string; description: string }] = data.categories;

  return (
    <div>
      {categories.map((category) => {
        return (
          <div key={category.name}>
            <span>{category.name}</span> <span>{category.description}</span>
          </div>
        );
      })}
    </div>
  );
}
