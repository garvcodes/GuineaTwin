'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:5050/leaderboard");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching leaderboard", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {users && users.length > 0 ? (
    users.map((user) => (
      <div key={user._id} className="bg-green-700 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{user.email}</h2>
        <div className="flex gap-4">
          {user.image && (
            <Image
              src={`data:${user.contentType};base64,${user.image}`} // Use base64-encoded image
              alt={`User ${user.email}'s image`}
              width={150}
              height={150}
            />
          )}
        </div>
      </div>
    ))
  ) : (
    <p className="text-white text-2xl">No users found.</p>
  )}
</div>
  );
}
