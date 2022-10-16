import axios from "axios";
import { 
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,

    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,
    POST_DETAILS_RESET,

    POST_CREATE_COMMENT_REQUEST,
    POST_CREATE_COMMENT_SUCCESS,
    POST_CREATE_COMMENT_FAIL,

    POST_CREATE_LIKE_REQUEST,
    POST_CREATE_LIKE_SUCCESS,
    POST_CREATE_LIKE_FAIL,
    POST_CREATE_LIKE_RESET,

    POST_TRENDING_REQUEST,
    POST_TRENDING_SUCCESS,
    POST_TRENDING_FAIL,

    POST_COMMENT_DELETE_REQUEST,
    POST_COMMENT_DELETE_SUCCESS,
    POST_COMMENT_DELETE_FAIL,

    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    POST_CREATE_RESET,   

    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAIL,

    POST_UPDATE_REQUEST,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAIL,
    POST_UPDATE_RESET,

    POST_LIST_MY_REQUEST,
    POST_LIST_MY_SUCCESS,
    POST_LIST_MY_FAIL,
    POST_LIST_MY_RESET,

    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_RESET,

    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,

    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_RESET,

    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_RESET,

    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DETAILS_RESET,

    POST_LIST_COMMENTS_REQUEST,
    POST_LIST_COMMENTS_SUCCESS,
    POST_LIST_COMMENTS_FAIL,
    POST_LIST_COMMENTS_RESET,

 } from '../constants/postConstants'
 import { toast } from "react-toastify";

 export const listPosts = () => async (dispatch) => {
    try {
      dispatch({ type: POST_LIST_REQUEST });
      const { data } = await axios.get(`/api/posts`);
      dispatch({
        type: POST_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.detail,
      });
    }
  };


  export const listComments = () => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_LIST_COMMENTS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/comments/`, config);
  
      dispatch({
        type: POST_LIST_COMMENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_LIST_COMMENTS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  

  export const listPostDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: POST_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/posts/${id}`);
      dispatch({
        type: POST_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.detail,
      });
    }
  };


  export const createPostComment = (postId, comment) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_CREATE_COMMENT_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      //here we are sending an empty {} object because we are creating the product from the backend and then updating it.
      const { data } = await axios.post(`/api/posts/${postId}/comments/`, comment, config);
  
      dispatch({
        type: POST_CREATE_COMMENT_SUCCESS,
        payload: data,
      });
      
    } catch (error) {
      dispatch({
        type: POST_CREATE_COMMENT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


  export const createPostLike = (postLikeId, like) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_CREATE_LIKE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      
      const { data } = await axios.post(`/api/posts/${postLikeId}/likes/`, like, config);
      
      dispatch({
        type: POST_CREATE_LIKE_SUCCESS,
        payload: data,
      });
      
      dispatch(listPostDetails(postLikeId));
      dispatch(listPosts(postLikeId));
      dispatch(listTrendingPosts(postLikeId));
      dispatch({ type: POST_CREATE_LIKE_RESET });

    } catch (error) {
      dispatch({
        type: POST_CREATE_LIKE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const listTrendingPosts = () => async (dispatch) => {
    try {   
        dispatch({ type: POST_TRENDING_REQUEST });
        const { data } = await axios.get(`/api/posts/trending/`);
        dispatch({
          type: POST_TRENDING_SUCCESS,
          payload: data,
        });
    } catch (error) {  
        dispatch({
          type: POST_TRENDING_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.detail,
        });
    }
  };

  export const deletePostComment = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_COMMENT_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/posts/comments/delete/${id}`, config);
  
      dispatch({
        type: POST_COMMENT_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: POST_COMMENT_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


  export const createPost = (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_CREATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      //here we are sending an empty {} object because we are creating the POST from the backend and then updating it.
      // const { data } = await axios.post(`/api/posts/create/`, {}, config);
  
      const { data } = await axios.post(`/api/posts/create/`, formData, config);
      
      dispatch({
        type: POST_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  

  export const listCategoryPost = () => async (dispatch) => {
    try {   
        dispatch({ type: CATEGORY_LIST_REQUEST });
        const { data } = await axios.get(`/api/posts/category/`);
        dispatch({
          type: CATEGORY_LIST_SUCCESS,
          payload: data,
        });
    } catch (error) {  
        dispatch({
          type: CATEGORY_LIST_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.detail,
        });
    }
  };


export const deletePost = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/posts/delete/${id}`, config);
  
      dispatch({
        type: POST_DELETE_SUCCESS,
      });

      
      dispatch(listPosts(id));
      dispatch(listTrendingPosts(id));
      dispatch(listPostDetails(id));

    } catch (error) {
      dispatch({
        type: POST_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


  export const updatePost = (post) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/posts/update/${post._id}/`, post, config);
  
      dispatch({
        type: POST_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: POST_DETAILS_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: POST_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const listMyPost = () => async (dispatch, getState) => {
    try {
      
      dispatch({ type: POST_LIST_MY_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/posts/myposts/`, config);
  
      dispatch({
        type: POST_LIST_MY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_LIST_MY_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  


  export const createCategory = (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_CREATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/category/create/`, formData, config);
      
      dispatch({
        type: CATEGORY_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  

  export const updateCategory = (category) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/category/update/${category._id}/`, category, config);
  
      dispatch({
        type: CATEGORY_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: CATEGORY_DETAILS_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: CATEGORY_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/category/delete/${id}`, config);
  
      dispatch({
        type: CATEGORY_DELETE_SUCCESS,
      });
      dispatch(listCategoryPost());
    } catch (error) {
      dispatch({
        type: CATEGORY_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const categoryDetail = (id) => async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/category/${id}`);
      dispatch({
        type: CATEGORY_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.detail,
      });
    }
  };
