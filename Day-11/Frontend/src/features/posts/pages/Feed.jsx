import React from 'react'
import "../style/feed.scss"
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import Nav from '../../shared/components/Nav';

const Feed = () => {

  const { 
    feed, 
    loading, 
    handleLike, 
    handleUnLike,
    handleFollow,        // 🔥 ADD
    handleUnfollow       // 🔥 ADD
  } = usePost()

  if (loading) {
    return (
      <main>
        <h1>Feed is Loading...</h1>
      </main>
    )
  }

  return (
    <main className='feed-page'>
      <Nav />

      <div className="feed">
        <div className="posts">

          {feed.length === 0 ? (
            <h2>No posts yet</h2>
          ) : (
            feed.map(post => (
              <Post
                key={post._id}
                user={post.user}
                post={post}
                handleLike={handleLike}
                handleUnLike={handleUnLike}
                handleFollow={handleFollow}       // 🔥 ADD
                handleUnfollow={handleUnfollow}   // 🔥 ADD
              />
            ))
          )}

        </div>
      </div>
    </main>
  )
}

export default Feed