import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { 
    postListReducer, 
    postDetailsReducer,
    postCommentCreateReducer,
    postLikeCreateReducer, 
    postTrendReducer,
    postCommentDeleteReducer,
    postCreateReducer,
    postDeleteReducer,
    postUpdateReducer,
    postListMyReducer,

    categoryDetailsReducer,
    categoryCreateReducer,
    categoryDeleteReducer,
    categoryUpdateReducer,
    listCategoryReducer,

    commentListReducer,
  } from "./reducers/postReducer";
import {
  userLoginReducer,
  userRegisterReducer,  
  userDetialsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  
} from "./reducers/userReducers";

const reducer = combineReducers({
    postList: postListReducer,
    postDetails: postDetailsReducer,
    postCommentsCreate: postCommentCreateReducer,
    postLikes: postLikeCreateReducer,
    postTrending: postTrendReducer,
    postCommentDelete:postCommentDeleteReducer,
    postCreate: postCreateReducer,
    postDelete: postDeleteReducer,
    postUpdate: postUpdateReducer,
    postListMy: postListMyReducer,

    commentList: commentListReducer,

    categoryDetails: categoryDetailsReducer,
    categoryCreate: categoryCreateReducer,
    categoryDelete: categoryDeleteReducer,
    categoryUpdate: categoryUpdateReducer,
    listCategory: listCategoryReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetialsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    
})

const userInfoFromStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;


const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};


const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
