import axios from "axios";
import config from "../config";

export const initAxiosAuth = () => {
    axios.interceptors.response.use(undefined, error => {

        const { status } = error.response;

        if(status === 404){
            console.log("not found");
            //history.push('/404');
        }

        if(status === 401){
            console.log("token expired");
            localStorage.clear();
            window.location.href = "/login";
        }

        if(status === 403){
            console.log("invalid content type");
        }

        if(status === 422){
            return Promise.reject(error.response);
        }

    })

    axios.interceptors.request.use(config => {
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
        error => Promise.reject(error)
    )

}

const getToken = () => {
    if(localStorage.getItem("session") !== null){
        return JSON.parse(localStorage.getItem("session"));
    }else{
        return null;
    }
}

export const registerUser = async (data) => {
    return axios.put(config.baseUrl + "user/register", data, {
        headers: {
            
        }
    }).then(response => { 
        return Promise.resolve(response);
    })
    .catch(error => {
        console.log('error', error);
        return Promise.resolve(error);
    });
}

export const loginUser = async (data) => {
    return axios.post(config.baseUrl + "user/login", data, {
        headers: {
            
        }
    }).then(response => { 
        return Promise.resolve(response);
    })
    .catch(error => {
        console.log('error', error);
        return Promise.resolve(error);
    });
}


export const getUser = async (userId) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}user/${userId}`, {
        data: {},
        headers: headers
    })
}

export const getPublisherVote = async (userId) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}publisher-vote/${userId}/all`, {
        data: {},
        headers: headers
    })
}

export const getNotifications = async (userId) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}platform-notification/${userId}/all`, {
        data: {},
        headers: headers
    })
}

export const setPublisherVote = async (userId, data) => {
    try{
        return axios.put(`${config.baseUrl}publisher-vote/${userId}/all`, data, {
            headers: {
                'X-Auth-Token': getToken()
            }
        })
    }catch (error){
        return error;
    }
}

export const patchUser = async (userId, data) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.patch(`${config.baseUrl}user/${userId}`, data,
        {headers: headers}
    )
}

export const uploadAvatar = async (userId, data) => {
    return axios.put(`${config.baseUrl}user/${userId}/avatar`, data, {
        headers: {
            'X-Auth-Token': getToken()
        }
    }).then(response => { 
        return Promise.resolve(response);
    })
    .catch(error => {
        console.log('error', error);
        return Promise.resolve(error);
    });
}

export const getPaymentAllCards = async (user) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}payment/${user}/all-cards`, {
        data: {},
        headers: headers
    }).then(response => { 
        return Promise.resolve(response);
    })
    .catch(error => {
        console.log('error', error);
        return Promise.resolve(error);
    });
}

export const getSubscriptionStatus = async (user) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}subscription/${user}/status`, {
        data: {},
        headers: headers
    })
}

export const resetPassword = async (email) => {
    const headers = {};
    return axios.get(`${config.baseUrl}user/reset-password-request/${email}`, {
        data: {},
        headers: headers
    }).then(response => { 
        return Promise.resolve(response);
    })
    .catch(error => {
        console.log('error', error);
        return Promise.resolve(error);
    });
}

export const getInvoiceState = async (invoiceId) => {
    const headers = {};
    return axios.get(`${config.baseUrl}payment/btc-invoice-state/${invoiceId}`, {
        data: {},
        headers: headers
    }).then(response => { 
        return Promise.resolve(response);
    })
    .catch(error => {
        console.log('error', error);
        return Promise.resolve(error);
    });
}

export const getPaymentHistory = async (user) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}payment/${user}/history`, {
        data: {},
        headers: headers
    })
}

export const deletePaymentCard = async (userId, cardId) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.delete(`${config.baseUrl}payment/${userId}/card/${cardId}`, {
        data: {},
        headers: headers
    })
}

export const createPaymentCard = async (userId, data) => {
    return axios.put(`${config.baseUrl}payment/${userId}/card/`, data, {
        headers: {
            'X-Auth-Token': getToken()
        }
    }).then(response => { 
        return Promise.resolve(response);
    })
    .catch(error => {
        return Promise.resolve(error);
    });
}

export const getAllEnabledProducts = async (data) => {
    return axios.get(config.baseUrl + "product/list/all-enabled", {
        data: {},
        headers: {
            'Content-Type': 'application/json',
        }});
}

export const createProduct = async () => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    const data = {
        "name": "Bitcoin Live Monthly",
        "cost": 149,
        "billingCycle": 1,
        "link": "/test-product",
        "description": "Try us for one month. Full premium access to all content. If you love it, just keep the plan. Or you can upgrade to our quarterly option and pay just $99 per month!"
    }
    try{
        return axios.put(config.baseUrl + "product", data, {
            headers: headers
        })
    }catch (error){
        return error;
    }
}

export const getAllEductionTopics = async () => {
    return axios.get(config.baseUrl + "post/education/all-topics", {
            data: {},
            headers: {
                'Content-Type': 'application/json',
            }});
}

export const getProduct = async (productId) => {
    return axios.get(`${config.baseUrl}product/${productId}`, {
            data: {},
            headers: {
                'Content-Type': 'application/json',
            }});
}

export const getMixedPostsForPublisher = async (publisherId, size, page) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}post/mixed/${publisherId}/${size}/${page}`, {
        data: {},
        headers: headers
    }) 
}

export const getPublicPostsForPublisher = async (publisherId, size, page) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}post/public/${publisherId}/${size}/${page}`, {
        data: {},
        headers: headers
    }) 
}

export const getMemberPosts = async (publisherId, size, page) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}post/member/${publisherId}/${size}/${page}`, {
        data: {},
        headers: headers
    })
}

export const getFovuritePosts = async () => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}favourites/posts`, {
        data: {},
        headers: headers
    })
}

export const getFavoriteAlerts = async () => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}favourites/alerts`, {
        data: {},
        headers: headers
    })
}

export const getPublicPosts = async (publisherId, size, page) => {
    const token = getToken();
    const headers = {};
    return axios.get(`${config.baseUrl}post/public/${publisherId}/${size}/${page}`, {
        data: {},
        headers: headers
    })
}

export const getMemberAlerts = async (publisherId, filter, pageSize, pageIndex) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}alert/member/${publisherId}/${filter}/${pageSize}/${pageIndex}`, {
        data: {},
        headers: headers
    })
}

export const getMixedAlerts = async (publisherId, filter, pageSize, pageIndex) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}alert/mixed/${publisherId}/${filter}/${pageSize}/${pageIndex}`, {
        data: {},
        headers: headers
    })
}

export const getPublicAlertsForPublisher = async (publisherId, size, page) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}alert/public/${publisherId}/${size}/${page}`, {
        data: {},
        headers: headers
    }) 
}

export const getEducationalPosts = async (filter, size, page) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.post(`${config.baseUrl}post/search/${size}/${page}`, filter, {
        headers: headers
    })
}

export const renewOrBuySubscription = async (userId, data) => {
    return axios.post(`${config.baseUrl}subscription/${userId}/renew-or-buy-new`, data, {
        headers: {
            'X-Auth-Token': getToken()
        }
    }).then(response => { 
        return Promise.resolve(response);
    })
    .catch(error => {
        console.log('error', error);
        return Promise.resolve(error);
    });
}

export const getNotificationPreference = async (userId) => {
    return axios.get(`${config.baseUrl}notification-preference/${userId}/all`, {
        data: {},
        headers: {
            'X-Auth-Token': getToken()
        }
    })
}

export const setNotificationPreference = async (userId, data) => {
    try{
        return axios.put(`${config.baseUrl}notification-preference/${userId}/all`, data, {
            headers: {
                'X-Auth-Token': getToken()
            }
        })
    }catch (error){
        return error;
    }
}

export const getSiteConfig = async () => {
    return axios.get(config.baseUrl + "config/all", {
        data: {},
        headers: {
            'X-Auth-Token': getToken()
        }
    })
}

export const getPostShortList = async () => {
    return axios.get(config.baseUrl + "post/short-list", {
        data: {},
        headers: {
            'X-Auth-Token': getToken()
        }
    })
}

export const getPost = async (id) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}post/${id}`, {
        data: {},
        headers: headers
    })
}

export const getPostBySlug = async (slug) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}post/by-slug/${slug}`, {
        data: {},
        headers: headers
    })
}

export const getComments = async (postId) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}comment/for-post/${postId}`, {
        data: {},
        headers: headers
    })
}

export const createComment = async (data) => {
    try{
        return axios.put(`${config.baseUrl}comment`, data, {
            headers: {
                'X-Auth-Token': getToken()
            }
        })
    }catch (error){
        return error;
    }
}

export const createFavoritePost = async (postId) => {
    try{
        return axios.put(`${config.baseUrl}favourites/posts/${postId} `, {}, {
            headers: {
                'X-Auth-Token': getToken()
            }
        })
    }catch (error){
        return error;
    }
}

export const createFavoriteAlert = async (alertId) => {
    try{
        return axios.put(`${config.baseUrl}favourites/alerts/${alertId} `, {}, {
            headers: {
                'X-Auth-Token': getToken()
            }
        })
    }catch (error){
        return error;
    }
}

export const removeFavoriteAlert = async (alertId) => {
    try{
        return axios.delete(`${config.baseUrl}favourites/alerts/${alertId}`, {
            data: {},
            headers: {
                'X-Auth-Token': getToken()
            }
        })
    }catch (error){
        return error;
    }
}

export const createLike = async (commentId) => {
    try{
        return axios.put(`${config.baseUrl}comment/like/${commentId}`, {}, {
            headers: {
                'X-Auth-Token': getToken()
            }
        })
    }catch (error){
        return error;
    }
}

export const removeLike = async (commentId) => {
    try{
        return axios.delete(`${config.baseUrl}comment/like/${commentId}`, {
            data: {},
            headers: {
                'X-Auth-Token': getToken()
            }
        })
    }catch (error){
        return error;
    }
}

export const createLikeOnPost = async (postId) => {
    try{
        return axios.put(`${config.baseUrl}post/like/${postId}`, {}, {
            headers: {
                'X-Auth-Token': getToken()
            }
        })
    }catch (error){
        return error;
    }
}

export const deleteLikeOnPost = async (postId) => {
    try{
        return axios.delete(`${config.baseUrl}post/like/${postId}`, {
            data: {},
            headers: {
                'X-Auth-Token': getToken()
            }
        })
    }catch (error){
        return error;
    }
}

export const getPostTagSearch = async (search) => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}post/tag/search/${search}`, {
        data: {},
        headers: headers
    })
}

export const getTradingUnit = async () => {
    const token = getToken();
    const headers = {};
    if(token !== null){
        headers['X-Auth-Token'] = token;
    }
    return axios.get(`${config.baseUrl}trading-unit/all`, {
        data: {},
        headers: headers
    })
}

export const createAlert = async (data) => {
    return axios.put(`${config.baseUrl}alert`, data, {
        headers: {
            'X-Auth-Token': getToken()
        }
    }).then(response => { 
        return Promise.resolve(response);
    })
    .catch(error => {
        console.log('error', error);
        return Promise.resolve(error);
    });
}

export const deletePost = async (postId) => {
    try{
        return axios.delete(`${config.baseUrl}post/${postId}`, {
            data: {},
            headers: {
                'X-Auth-Token': getToken()
            }
        })
    }catch (error){
        return error;
    }
}

export const createAlertUpdate = async (data) => {
    try{
        return axios.put(config.baseUrl + "alert/update", data, {
            headers: {
                'X-Auth-Token': getToken()
            }
        })
    }catch (error){
        return error;
    }
}

export const getWistiaConfig = async () => {
    return axios.get(config.baseUrl + "config/wistia", {
        data: {},
        headers: {
            'X-Auth-Token': getToken()
        }
    })
}

export const publishPost = async (data) => {
    return axios.put(`${config.baseUrl}post`, data, {
        headers: {
            'X-Auth-Token': getToken()
        }
    }).then(response => { 
        return Promise.resolve(response);
    })
    .catch(error => {
        console.log('error', error);
        return Promise.resolve(error);
    });
}

export const updatePost = async (postId, data) => {
    try{
        return axios.patch(`${config.baseUrl}post/${postId}`, data, {
            headers: {
                'X-Auth-Token': getToken()
            }
        })
    }catch (error){
        return error;
    }
}