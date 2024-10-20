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
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-500">
      <div className="container mx-auto p-8 text-white">
        <h1 className="text-4xl font-serif font-medium mb-8">Leaderboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <div key={user._id} className="bg-green-700 p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{user.email}</h2>
              <div className="flex gap-4">
                {user.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image.url}
                    alt={`Upload ${index + 1}`}
                    width={250}
                    height={250}
                    className="rounded-lg"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
