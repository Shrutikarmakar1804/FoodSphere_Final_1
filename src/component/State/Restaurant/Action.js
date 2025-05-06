import axios from "axios";
import api from "../../config/api";
import {
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  GET_ALL_EVENT_FAILURE,
  GET_ALL_EVENT_REQUEST,
  GET_ALL_EVENT_SUCCESS,
  GET_RESTAURANT_EVENT_FAILURE,
  GET_RESTAURANT_EVENT_REQUEST,
  GET_RESTAURANT_EVENT_SUCCESS,
  GET_RESTAURANT_CATEGORY_FAILURE,
  GET_RESTAURANT_CATEGORY_REQUEST,
  GET_RESTAURANT_CATEGORY_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
} from "./ActionTypes";


export const getAllRestaurantAction = (jwt) => async (dispatch) => {
  dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
  try {
    const { data } = await api.get(`/api/restaurants`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error.message });
  }
};

export const getRestaurantById = (restaurantId, reqData) => async (dispatch) => {
  const token = reqData?.jwt || reqData?.token;
  dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
  try {
    // console.log(restaurantId, "restaurantId");
    // console.log(token, "token");
    // console.log(reqData, "reqData");
    // exit();
    const res = await api.get(`/api/restaurants/${restaurantId}`, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error.message });
  }
};

export const getRestaurantByUserId = (jwt) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/admin/restaurants/user`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error.message });
  }
};

export const createRestaurant = ({ jwt, data }) => async (dispatch) => {
  if (!jwt || !data) {
    dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: "Missing jwt or data" });
    return;
  }
  dispatch({ type: CREATE_RESTAURANT_REQUEST });
  try {
    const response = await api.post(`/api/admin/restaurants`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error.message });
  }
};

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => async (dispatch) => {
  dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
  try {
    const response = await api.put(`/api/admin/restaurants/${restaurantId}`, restaurantData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error.message });
  }
};

export const deleteRestaurant = (restaurantId, jwt) => async (dispatch) => {
  dispatch({ type: DELETE_RESTAURANT_REQUEST });
  try {
    await api.delete(`/api/admin/restaurants/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
  } catch (error) {
    dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error.message });
  }
};

export const updateRestaurantStatus = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
  try {
    const response = await api.put(`/api/admin/restaurants/${restaurantId}/status`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error.message });
  }
};

export const createEventAction = ({ reqData, jwt, restaurantId }) => async (dispatch) => {
  dispatch({ type: CREATE_EVENT_REQUEST });
  try {
    const { data } = await api.post(`${API_URL}/api/admin/restaurants/${restaurantId}/event`, reqData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: CREATE_EVENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_EVENT_FAILURE, payload: error.message });
  }
};

export const getAllEvent = ({ jwt }) => async (dispatch) => {
  dispatch({ type: GET_ALL_EVENT_REQUEST });
  try {
    const { data } = await api.get(`/api/event`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: GET_ALL_EVENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_EVENT_FAILURE, payload: error.message });
  }
};

export const deleteEventAction = ({ eventId, jwt }) => async (dispatch) => {
  dispatch({ type: DELETE_EVENT_REQUEST });
  try {
    await api.delete(`/api/admin/event/${eventId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId });
  } catch (error) {
    dispatch({ type: DELETE_EVENT_FAILURE, payload: error.message });
  }
};

export const getRestaurantEvent = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_EVENT_REQUEST });
  try {
    const { data } = await api.get(`/api/admin/restaurants/${restaurantId}/event`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: GET_RESTAURANT_EVENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_RESTAURANT_EVENT_FAILURE, payload: error.message });
  }
};

export const createCategoryAction = ({ reqData, jwt }) => async (dispatch) => {
  dispatch({ type: CREATE_CATEGORY_REQUEST });
  try {
    const { data } = await api.post(`/api/admin/category`, reqData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message });
  }
};

export const getRestaurantCategory = ({ jwt, restaurantId }) =>
  async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });
    try {
      const response = await api.get(`/api/category/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(" get restaurant category ", response.data);
      dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: GET_RESTAURANT_CATEGORY_FAILURE, payload: error.message });
    }
  };
