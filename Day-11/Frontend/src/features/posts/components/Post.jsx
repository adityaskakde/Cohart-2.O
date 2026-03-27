import React from "react";
import '../style/post.scss'

const Post = ({ 
  user, 
  post, 
  handleLike, 
  handleUnLike, 
  handleFollow,
  handleUnfollow
}) => {

  // ❤️ LIKE
  const toggleLike = async () => {
    if (post.isLiked) {
      await handleUnLike(post);
    } else {
      await handleLike(post);
    }
  };

  // 🔥 FOLLOW TOGGLE (NO LOCAL STATE)
  const toggleFollow = async () => {
    try {
      if (user.isFollowing) {
        await handleUnfollow(user.username);
      } else {
        await handleFollow(user.username);
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <div className="post">

      {/* 🔹 USER */}
      <div className="user">
        <div className="img-wrapper">
          <img src={user.profileImage} alt="" />
        </div>

        <p>{user.username}</p>

        {/* 🔥 BUTTON */}
        <button className="follow-btn" onClick={toggleFollow}>
          {user.isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>

      {/* 🔹 IMAGE */}
      <img src={post.imgUrl} alt="" />

      {/* 🔹 ICONS */}
      <div className="icons">
        <div className="left">

          {/* ❤️ LIKE */}
          <button onClick={toggleLike}>
            {post.isLiked ? (
              <svg viewBox="0 0 24 24" fill="red">
                <path d="M12 21s-7-4.35-9.33-7.36C.36 11.28 1.2 7.5 4.1 5.6c2.1-1.4 4.9-1 6.6.9 1.7-1.9 4.5-2.3 6.6-.9 2.9 1.9 3.7 5.68 1.43 8.04C19 16.65 12 21 12 21z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.8 4.6c-1.5-1.5-4-1.5-5.5 0L12 7.9l-3.3-3.3c-1.5-1.5-4-1.5-5.5 0-1.5 1.5-1.5 4 0 5.5l3.3 3.3L12 21l5.5-7.6 3.3-3.3c1.5-1.5 1.5-4 0-5.5z"/>
              </svg>
            )}
          </button>

          {/* 💬 COMMENT */}
          <button onClick={() => alert("Comment clicked")}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3Z"/>
            </svg>
          </button>

          {/* 🔁 SHARE */}
          <button onClick={() => alert("Share clicked")}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3 18 3 18 3 18C3 12.4772 7.47715 8 13 8V3L23 11L13 19V14Z"/>
            </svg>
          </button>

        </div>

        {/* 🔖 SAVE */}
        <div className="right">
          <button onClick={() => alert("Saved!")}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22L12 18L4 22V3C4 2.44772 4 2.44772 5 2Z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* 🔥 LIKES */}
      <div className="likes">
        <p>{post.likesCount || 0} likes</p>
      </div>

      {/* 🔹 CAPTION */}
      <div className="bottom">
        <p className="caption">
          <strong>{user.username}</strong> {post.caption}
        </p>
      </div>

    </div>
  );
};

export default React.memo(Post);