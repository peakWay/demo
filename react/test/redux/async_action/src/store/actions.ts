import { AnyAction } from '_redux@4.0.5@redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

//切换列表
export const SELETE_SUBREDDIT = 'SELETE_SUBREDDIT'

export const selectSubreddit = (subreddit)=> {
    return {
        type: SELETE_SUBREDDIT,
        subreddit
    }
}

//刷新列表
export const INVALIDATE_SUBREDDIT =  'INVALIDATE_SUBREDDIT'

export const invalidateSubreddit = (subreddit) => {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

//请求列表
export const REQUEST_POSTS = 'REQUEST_POSTS'

export const requestPosts =  (subreddit)  =>  {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

//接收列表数据
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const receivePosts = (subreddit, json)  => {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.list,
        receivedAt: Date.now()
    }
}


export const CHANGE_NAME = 'CHANGE_NAME';
export const changeName = (data: any) => ({
    type: CHANGE_NAME,
    data
});
export const changeNameAsync = (data?: any) => (dispatch: Dispatch) => {
    dispatch(changeName('loading'));
    fetch('/api').then(res => res.json()).then(res => dispatch(changeName(res.data)));
}

  
export const fetchPosts = (subreddit) => {
    return function (dispatch) {
        dispatch(requestPosts(subreddit))

        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch(receivePosts(subreddit, {
                    list: [
                        {
                            id: 1,
                            title: 'i like react'
                        },
                        {
                            id: 2,
                            title: 'i like redux too'
                        }
                    ]
                }))
                resolve(null);
            }, 1000)
        })
    }
}



export const asyncFetchPosts = (subreddit) => async (dispatch, getState) => {

    dispatch(requestPosts(subreddit))

    let promise = new Promise((resolve) => {
        setTimeout(() => {
            dispatch(receivePosts(subreddit, {
                list: [
                    {
                        id: 1,
                        title: 'i like react'
                    },
                    {
                        id: 2,
                        title: 'i like redux too'
                    }
                ]
            }))
            resolve(null);
        }, 1000)
    })

    await promise;
}

const shouldFetchPosts = (state, subreddit) => {
    const posts = state.postsBySubreddit[subreddit]
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export const fetchPostsIfNeed = (subreddit) => {
    return function (dispatch, getState) {
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit))
        } else {
            return Promise.resolve()
        }
    }
}


export const asyncFetchPostsIfNeed = (subreddit) => (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
        dispatch(fetchPosts(subreddit))
    }
}