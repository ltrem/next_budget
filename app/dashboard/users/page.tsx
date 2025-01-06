"use client";

import { use } from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (!data.users || data.users.length <= 0) {
    return <div>No result(s)</div>;
  }

  const users: [{ name: string; id: string }] = data.users;

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.name}>
            <span>{user.name}</span> <span>{user.id}</span>
          </div>
        );
      })}
    </div>
  );
}
