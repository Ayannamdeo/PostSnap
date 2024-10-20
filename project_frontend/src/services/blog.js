import axios from "axios";

const getToken = () => {
  return sessionStorage.getItem("JWT");
};

export const getDocumentCount = async () => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:3000/api/blogs/count/documentcount`,
      config,
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
      "http://localhost:3000/api/blogs/",
      config,
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

export const getSingleBlogPost = async ({ id }) => {
  try {
    console.log("inside getSingleBlogPost");
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:3000/api/blogs/${id}`,
      config,
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
    const { data } = await axios.post(
      "http://localhost:3000/api/blogs/",
      postBody,
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

export const updateBlogPost = async ({ id, title, body, imageUrl }) => {
  try {
    // console.log();
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:3000/api/blogs/${id}`,
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
      `http://localhost:3000/api/blogs/userblogs/${userId}`,
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

    const { data } = await axios.delete(
      `http://localhost:3000/api/blogs/${id}`,
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
      `http://localhost:3000/api/blogs/likeunlike/${postId}`,
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
