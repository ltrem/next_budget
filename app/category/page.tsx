"use client";

import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query Posts {
    posts {
      title
      content
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
  const posts: [{ title: string; content: string }] = data.posts;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.title}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
