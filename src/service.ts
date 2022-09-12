const BASE_URL = "http://tweet-app-be-lb-890438739.ap-south-1.elb.amazonaws.com/api/v1.0/tweets"

export async function login(username: String, password: String) {
    const response = await fetch(BASE_URL + "/login", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ username, password })
    })
    return response;
}

export async function loadTweets(page: Number = 0) {
    const response = await fetch(BASE_URL + `/all?page=${page}`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        },
    })

    return await response.json();
}


export async function createTweet(tweet: String, tweetTag: [String]) {
    const username = localStorage.getItem("user");
    const response = await fetch(BASE_URL + `/${username}/add`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        },
        body: JSON.stringify({
            tweet,
            tweetTag,
        })
    })
}


export async function replyTweet(id: String, tweet: String, tweetTag: [String]) {
    const username = localStorage.getItem("user");
    const response = await fetch(BASE_URL + `/${username}/reply/${id}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        },
        body: JSON.stringify({
            tweet,
            tweetTag,
        })
    })
}


export async function getAllUsers() {
    const response = await fetch(BASE_URL + `/users/all`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        }
    })
    return await response.json();
}

export async function searchUser(key: String) {
    const response = await fetch(BASE_URL + `/user/search/${key}`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        }
    })
    return await response.json();
}

export async function getAllTweetsOfUser(id: String, page: Number = 0) {
    const response = await fetch(BASE_URL + `/${id}?page=${page}`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        }
    })
    return await response.json();
}

export async function isUsernameExist(key: String) {
    const response = await fetch(BASE_URL + `/username/${key}`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
        }
    })
    return await response.json();
}

export async function register(user: { firstName: String, lastName: String, userName: String, email: String, password: String, resetKey: String }) {
    const response = await fetch(BASE_URL + `/register`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(user)
    })
    return await response;
}


export async function updateTweet(id: String, tweet: String, tweetTag: [String]) {
    const username = localStorage.getItem("user");
    const response = await fetch(BASE_URL + `/${username}/update/${id}`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        },
        body: JSON.stringify({
            tweet,
            tweetTag,
        })
    })
}

export async function likeTweet(id: String) {
    const username = localStorage.getItem("user");
    const response = await fetch(BASE_URL + `/${username}/like/${id}`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        }
    })
}

export async function deleteTweet(id: String) {
    const username = localStorage.getItem("user");
    const response = await fetch(BASE_URL + `/${username}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        }
    })
}


export async function logout() {
    const response = await fetch(BASE_URL + `/sign-out`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        },
        body: JSON.stringify({ refreshToken: localStorage.getItem("refresh-token") })
    })
}


export async function unLikeTweet(id: String) {
    const username = localStorage.getItem("user");
    const response = await fetch(BASE_URL + `/${username}/unlike/${id}`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        }
    })
}

export async function changePassword(newPassword) {
    const username = localStorage.getItem("user");
    const response = await fetch(BASE_URL + `/${username}/forgot`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token")
        },
        body: JSON.stringify({ newPassword })
    })
}

export async function getAccessToken() {
    if (localStorage.getItem('user')) {
        const accessToken = await fetch(BASE_URL + "/createAccessToken", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "content-type": "application/json"
            },
            body: JSON.stringify({ "refreshToken": localStorage.getItem("refresh-token") })
        })
        localStorage.setItem("access-token", await accessToken.text());
    }
}