import React, { useState } from "react";
import { useFollow } from "../hooks/useFollow";

const FollowButton = ({ userId, isFollowing }) => {
  const { handleFollow, handleUnfollow, loading } = useFollow();
  const [following, setFollowing] = useState(isFollowing);

  const toggleFollow = async () => {
    if (following) {
      await handleUnfollow(userId);
      setFollowing(false);
    } else {
      await handleFollow(userId);
      setFollowing(true);
    }
  };

  return (
    <button onClick={toggleFollow} disabled={loading}>
      {following ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;