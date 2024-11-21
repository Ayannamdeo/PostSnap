import axios from "axios";
import { getToken } from "../utils/helpers/auth";

const API_URL = import.meta.env.VITE_API_URL;
console.log("blog api_url: ", API_URL);

export const getDocumentCount = async () => {
  try {
    // const token = getToken();
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    const { data } = await axios.get(
      `${API_URL}/blogs/count/documentcount`,
      // config,
    );
    console.log("data from getDocumentCount", data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const getAllBlogPosts = async ({ pageParam = 0 }) => {
  try {
    console.log("inside getAllBlogPosts");
    // const token = getToken();

    const config = {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      params: {
        offset: pageParam,
        limit: 6,
        sort: "createdAt",
      },
    };

    const { data } = await axios.get(`${API_URL}/blogs/`, config);
    console.log("data from getAllBlogPosts", data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const getSingleBlogPost = async ({ id }) => {
  try {
    console.log("inside getSingleBlogPost");
    // const token = getToken();
    //
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    const { data } = await axios.get(
      `${API_URL}/blogs/${id}`,
      // config,
    );
    console.log("data from getAllBlogPosts", data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const createBlogPost = async (postBody) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`${API_URL}/blogs/`, postBody, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updateBlogPost = async ({ id, title, body, imageUrl }) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${API_URL}/blogs/${id}`,
      { title, body, imageUrl },
      config,
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getMyBlogPosts = async ({ userId, pageParam }) => {
  try {
    console.log("userId inside getMyBlogPOsts: ", userId);
    console.log("pageParam inside getMyBlogPOsts: ", pageParam);
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        offset: pageParam,
        limit: 6,
        sort: "createdAt",
      },
    };

    const { data } = await axios.get(
      `${API_URL}/blogs/userblogs/${userId}`,
      config,
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const deleteBlogPost = async ({ id }) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`${API_URL}/blogs/${id}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const likeUnlikePost = async ({ userId, postId }) => {
  try {
    const token = getToken();
    // console.log("token inside likeUnlikePost: ", token);
    console.log("userId", userId);
    console.log("postId", postId);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/blogs/likeunlike/${postId}`,
      { userId },
      config,
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error(error.message);
    throw new Error(error.message);
  }
};
