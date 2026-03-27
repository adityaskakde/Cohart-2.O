import axios from "axios";


const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})


export async function getFeed(){
    const response = await api.get('/api/posts/feed')
      
        return response.data
    
}

export async function createPost(imageFile, caption){
    const formData = new FormData()

    formData.append("image",imageFile)
    formData.append("caption",caption)
    const response = await api.post("/api/posts", formData)

    return response.data
}

export async function likePost(postId){
    const response = await api.post("/api/posts/like/" + postId)
    return response.data
}



export async function unlikePost(postId){
    const response = await api.post("/api/posts/unlike/" + postId)
    return response.data
}
export async function followUser(userId){
    const response = await api.post("/api/users/follow/" + userId)
    return response.data
}

export async function unfollowUser(userId){
    const response = await api.post("/api/users/unfollow/" + userId)
    return response.data
}

export async function getUserProfile(userId){
    const response = await api.get("/api/users/" + userId)
    return response.data
}
// 🔔 GET PENDING REQUESTS
export async function getPendingRequests(){
    const response = await api.get("/api/users/pending")
    return response.data
}

// ✅ ACCEPT REQUEST
export async function acceptRequest(requestId){
    const response = await api.post("/api/users/accept/" + requestId)
    return response.data
}

// ❌ REJECT REQUEST
export async function rejectRequest(requestId){
    const response = await api.post("/api/users/reject/" + requestId)
    return response.data
}