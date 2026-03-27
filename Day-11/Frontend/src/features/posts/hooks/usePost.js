import { createPost, getFeed, likePost, unlikePost, followUser, unfollowUser } from "../services/postapi";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {

    const context = useContext(PostContext)

    const { loading, setLoading, post, setPost, feed, setFeed } = context

    //  GET FEED
    const handleGetFeed = async () => {
        try {
            setLoading(true)
            const data = await getFeed()
            setFeed(data.posts)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    //  CREATE POST
    const handleCreatePost = async (imageFile, caption) => {
        try {
            setLoading(true)
            const data = await createPost(imageFile, caption)
            setFeed(prev => [data.post, ...prev])
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    // LIKE (Optimistic)
    const handleLike = async (post) => {
        try {
            setFeed(prevFeed =>
                prevFeed.map(p =>
                    p._id === post._id
                        ? { ...p, isLiked: true, likesCount: (p.likesCount || 0) + 1 }
                        : p
                )
            )

            await likePost(post._id)

        } catch (err) {
            console.log(err)
        }
    }

    //  UNLIKE (Optimistic)
    const handleUnLike = async (post) => {
        try {
            setFeed(prevFeed =>
                prevFeed.map(p =>
                    p._id === post._id
                        ? { ...p, isLiked: false, likesCount: (p.likesCount || 1) - 1 }
                        : p
                )
            )

            await unlikePost(post._id)

        } catch (err) {
            console.log(err)
        }
    }

    const handleFollow = async (userId) => {
    try {
        setFeed(prevFeed =>
            prevFeed.map(p =>
                p.user.username === userId
                    ? {
                        ...p,
                        user: {
                            ...p.user,
                            isFollowing: true,
                            followersCount: (p.user.followersCount || 0) + 1
                        }
                    }
                    : p
            )
        )

        await followUser(userId)

    } catch (err) {
        console.log(err)
    }
}

    const handleUnfollow = async (userId) => {
    try {
        setFeed(prevFeed =>
            prevFeed.map(p =>
                p.user.username === userId
                    ? {
                        ...p,
                        user: {
                            ...p.user,
                            isFollowing: false,
                            followersCount: (p.user.followersCount || 1) - 1
                        }
                    }
                    : p
            )
        )

        await unfollowUser(userId)

    } catch (err) {
        console.log(err)
    }
}
    // ✅ INITIAL LOAD
    useEffect(() => {
        handleGetFeed()
    }, [])

    return {
        loading,
        post,
        feed,
        handleGetFeed,
        handleCreatePost,
        handleLike,
        handleUnLike,
        handleFollow,
        handleUnfollow
    }
}