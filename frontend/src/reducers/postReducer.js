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
    POST_CREATE_COMMENT_RESET,

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

    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAIL,

    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    POST_CREATE_RESET, 

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

    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DETAILS_RESET,

    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_RESET,


    POST_LIST_COMMENTS_REQUEST,
    POST_LIST_COMMENTS_SUCCESS,
    POST_LIST_COMMENTS_FAIL,
    POST_LIST_COMMENTS_RESET,

 } from '../constants/postConstants'


export const postListReducer = (state = { posts:[]}, action) => {
    switch (action.type) {
      case POST_LIST_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case POST_LIST_SUCCESS:
        return {
          loading: false,
          posts: action.payload.posts,
          // page:  action.payload.page, 
          // pages: action.payload.pages

        };
      case POST_LIST_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };


  export const commentListReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
      case POST_LIST_COMMENTS_REQUEST:
        return { loading: true };
      case POST_LIST_COMMENTS_SUCCESS:
        return { loading: false, comments: action.payload };
      case POST_LIST_COMMENTS_FAIL:
        return { loading: false, error: action.payload };
      case POST_LIST_COMMENTS_RESET:
        return { comments: [] };
      default:
        return state;
    }
  };




  export const postDetailsReducer = ( state = { post: { comments: [], likes:[] } }, action) => {
    switch (action.type) {
      case POST_DETAILS_REQUEST:
        return { loading: true, ...state };
      case POST_DETAILS_SUCCESS:
        return { loading: false, post: action.payload };
      case POST_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case POST_DETAILS_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const postCommentCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_CREATE_COMMENT_REQUEST:
        return { loading: true };
      case POST_CREATE_COMMENT_SUCCESS:
        return { loading: false, success: true };
      case POST_CREATE_COMMENT_FAIL:
        return { loading: false, error: action.payload };
      case POST_CREATE_COMMENT_RESET:
        return {};
      default:
        return state;
    }
  };

  export const postLikeCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_CREATE_LIKE_REQUEST:
        return { loading: true };
      case POST_CREATE_LIKE_SUCCESS:
        return { loading: false, success: true };
      case POST_CREATE_LIKE_FAIL:
        return { loading: false, error: action.payload };
      case POST_CREATE_LIKE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const postCommentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_COMMENT_DELETE_REQUEST:
        return { loading: true };
      case POST_COMMENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case POST_COMMENT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const postDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_DELETE_REQUEST:
        return { loading: true };
      case POST_DELETE_SUCCESS:
        return { loading: false, success: true };
      case POST_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  
  export const postTrendReducer = (state = {posts:[]}, action) => {
    switch (action.type) {
      case POST_TRENDING_REQUEST:
        return { loading: true, posts:[] };
      case POST_TRENDING_SUCCESS:
        return { loading: false, posts: action.payload };
      case POST_TRENDING_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  export const postCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_CREATE_REQUEST:
        return { loading: true };
      case POST_CREATE_SUCCESS:
        return { loading: false, success: true };
      case POST_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case POST_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const listCategoryReducer = (state =  { categories: []}, action) => {
    switch (action.type) {
      case CATEGORY_LIST_REQUEST:
        return { loading: true, categories: [] };
      case CATEGORY_LIST_SUCCESS:
        return { loading: false, success: true, categories: action.payload };
      case CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload };
      case CATEGORY_LIST_RESET:
        return {};
      default:
        return state;
    }
  };

  export const postUpdateReducer = (state = {post : {}}, action) => {
    switch (action.type) {
      case POST_UPDATE_REQUEST:
        return { loading: true };
      case POST_UPDATE_SUCCESS:
        return { loading: false, success: true, post: action.payload };
      case POST_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case POST_UPDATE_RESET:
        return {post : {}};
      default:
        return state;
    }
  };

  export const postListMyReducer = (state = { myposts: [] }, action) => {
    switch (action.type) {
      case POST_LIST_MY_REQUEST:
        return {
          loading: true,
        };
      case POST_LIST_MY_SUCCESS:
        return {
          loading: false,
          myposts: action.payload,
        };
      case POST_LIST_MY_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case POST_LIST_MY_RESET:
        return {
          myposts: [],
        };
  
      default:
        return state;
    }
  };

  export const categoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_CREATE_REQUEST:
        return { loading: true };
      case CATEGORY_CREATE_SUCCESS:
        return { loading: false, success: true };
      case CATEGORY_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case CATEGORY_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const categoryUpdateReducer = (state = {category : {}}, action) => {
    switch (action.type) {
      case CATEGORY_UPDATE_REQUEST:
        return { loading: true };
      case CATEGORY_UPDATE_SUCCESS:
        return { loading: false, success: true, category: action.payload };
      case CATEGORY_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case CATEGORY_UPDATE_RESET:
        return {category : {}};
      default:
        return state;
    }
  };

  export const categoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_DELETE_REQUEST:
        return { loading: true };
      case CATEGORY_DELETE_SUCCESS:
        return { loading: false, success: true };
      case CATEGORY_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const categoryDetailsReducer = ( state = { category: {} }, action) => {
    switch (action.type) {
      case CATEGORY_DETAILS_REQUEST:
        return { loading: true, ...state };
      case CATEGORY_DETAILS_SUCCESS:
        return { loading: false, category: action.payload };
      case CATEGORY_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case CATEGORY_DETAILS_RESET:
        return {};
      default:
        return state;
    }
  };