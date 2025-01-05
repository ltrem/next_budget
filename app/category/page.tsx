"use client";

import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query GetCategories {
    categories {
      name
      description
    }
  }
`;

export default function Category() {
  const { data, loading, error } = useQuery(QUERY, {
    pollInterval: 500,
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  // TODO: Fix typing so we don't have to manually
  const categories: [{ name: string; description: string }] = data.categories;

  return (
    <div>
      {categories.map((post) => (
        <div key={post.name}>
          <h3>{post.name}</h3>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}
