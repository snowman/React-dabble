import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

const resolve = response => {
  if (response.ok) {
    return response;
  } else { // Like 404 Not Found
    var error = new Error('Error ' + response.status + ': ' + response.statusText)
    error.response = response;
    throw error
  }
}

const reject = error => { // Like when you server shut down
  var errmess = new Error(error.message)
  throw errmess
}

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId,
    rating,
    author,
    comment
  }
  newComment.date = new Date().toISOString();

  return fetch(baseUrl + 'comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  .then(resolve, reject)
  .then(response => response.json())
  .then(response => { dispatch(addComment(response))})
  .catch(error => {
    console.log('post comments', error.message);
    alert('Your comment could not be posted\nError: '+error.message);
  })
}

export const postFeedback = (feedback) => (dispatch) => {
  const newFeedback = JSON.parse(JSON.stringify(feedback));
  newFeedback.date = new Date().toISOString();

  return fetch(baseUrl + 'feedbacks', {
    method: 'POST',
    body: JSON.stringify(newFeedback),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  .then(resolve, reject)
  .catch(error => {
    console.log('post comments', error.message);
    alert('Your comment could not be posted\nError: '+error.message);
  })
}

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const fetchDishes = () => {
  return (dispatch) => {
    dispatch(dishesLoading())

    return fetch(baseUrl + 'dishes')
    .then(resolve, reject)
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)))
  }
}

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const commentsLoading = () => ({
  type: ActionTypes.COMMENTS_LOADING
});

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const fetchComments = () => (dispatch) => {
  dispatch(commentsLoading())

  return fetch(baseUrl + 'comments')
  .then(resolve, reject)
  .then(response => response.json())
  .then(comments => dispatch(addComments(comments)))
  .catch(error => dispatch(commentsFailed(error.message)))
};

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrl + 'promotions')
  .then(resolve, reject)
  .then(response => response.json())
  .then(promos => dispatch(addPromos(promos)))
  .catch(error => dispatch(promosFailed(error.message)))
}

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());

  return fetch(baseUrl + 'leaders')
  .then(resolve, reject)
  .then(response => response.json())
  .then(leaders => dispatch(addLeaders(leaders)))
  .catch(error => dispatch(leadersFailed(error.message)))
}
