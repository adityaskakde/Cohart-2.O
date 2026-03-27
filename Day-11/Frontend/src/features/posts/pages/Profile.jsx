import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/user";
import FollowButton from "../components/FollowButton";

const Profile = ({ userId, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const data = await getUserProfile(userId);
    setUser(data);
  };

  if (!user) return <h1>Loading...</h1>;

  const isFollowing = user.followers.includes(currentUser._id);

  return (
    <div>
      <h2>{user.username}</h2>

      <p>Followers: {user.followers.length}</p>
      <p>Following: {user.following.length}</p>

      {user._id !== currentUser._id && (
        <FollowButton userId={user._id} isFollowing={isFollowing} />
      )}
    </div>
  );
};

export default Profile;