import axios from "axios";

const API_URL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete config.headers["Authorization"];
  }
  return config;
});

async function userId() {
  try {
    const user = await axiosInstance.get(`/users/login`);

    const userId: string = user.data._id;
    return userId;
  } catch (error) {
    throw error;
  }
}

async function userRole() {
  try {
    const user = await axiosInstance.get(`/users/login`);

    const userRole: string = user.data.role;

    console.log(userRole);

    return userRole;
  } catch (error) {
    throw error;
  }
}

// user verification

export const verifyUser = async (tokenData: { token: string }) => {
  try {
    const response = await axiosInstance.post(`/users/verify`, tokenData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

//  Reset user password

export const resetPassword = async (userEmail: { email: string }) => {
  try {
    const response = await axiosInstance.post(
      `/users/reset-password`,
      userEmail
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

//  Set a new password

export const handleSetPassword = async (setPasswordPayload: {
  newPassword: string;
  token: string;
}) => {
  try {
    const response = await axiosInstance.put(
      `/users/reset-confirm`,
      setPasswordPayload
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Upload file
export const uploadFile = async (formData: any) => {
  try {
    const response = await axiosInstance.post(`/uploads`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Register User
export const registerUser = async (userData: {
  name: string;
  password: string;
  email: string;
  role: string;
}) => {
  try {
    const response = await axiosInstance.post(`/users`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login User
export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post(`/users/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Validate login
export const validateLogin = async () => {
  try {
    const response = await axiosInstance.get(`/users/login`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update profile
export const updateProfile = async (
  userData: {
    name: string;
    email: string;
  },
  id: string
) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Change password
export const changePassword = async (
  userData: {
    currentPassword: string;
    newPassword: string;
  },
  id: string
) => {
  try {
    const response = await axiosInstance.put(
      `/users/change-password/${id}`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user
export const getUser = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get users
export const getUsers = async (page: number, limit: number, q?: string) => {
  try {
    let url = `/users?page=${page}&limit=${limit}`;

    if (q) url += `&q=${q}`;

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete user
export const deleteUser = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get categories
export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(`/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add product
export const addProduct = async (formData: any) => {
  try {
    formData.append(
      "userId",
      (await userRole()) == "admin" ? "" : await userId()
    );

    const response = await axiosInstance.post(`/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// post save product


export const saveProduct = async (url:string, productId: {productId: string})=> {
try{
    const response = await axiosInstance.put(url, productId);
  return response.data
}catch(error){
throw error
}
}

// get saved products


export const getSavedProducts = async (
  url: string,
 
) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Payout

export const requestPayout = async (
  url: string,
  paymentmethod: { paymentMethod: string }
) => {
  try {
    const res = await axiosInstance.post(url, paymentmethod);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const contactSupport = async (
  url: string,
  contactData: {
    name: string;

    message: string;
  }
) => {
  try {
    const res = await axiosInstance.post(url, contactData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Get products
export const getProducts = async (
  page: number,
  limit: number,
  q?: string,
  sortBy?: string
) => {
  try {
    let url = `/products?userId=${
      (await userRole()) == "admin" ? "" : await userId()
    }&page=${page}&limit=${limit}`;

    if (q) url += `&q=${q}`;
    if (sortBy) url += `&sortBy=${sortBy}`;

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get products
export const getAllProducts = async (
  page: number,
  limit: number,
  q?: string,
  sortBy?: string,
  category?: string
) => {
  try {
    let url = `/products?page=${page}&limit=${limit}`;

    if (q) url += `&q=${q}`;
    if (sortBy) url += `&sortBy=${sortBy}`;
    if (category) url += `&category=${category}`;

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get product
export const getProduct = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update product
export const updateProduct = async (formData: any, id: string) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update product views
export const updateProductViews = async (views: number, id: string) => {
  try {
    const response = await axiosInstance.put(`/products/views/${id}`, {
      views: views,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create checkout session
export const createCheckoutSession = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      `/stripe/create-checkout-session`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create Order
export const createOrder = async (data: any) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.post(`/orders`, data);

    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get orders
export const getOrders = async (page: number, limit: number, q?: string) => {
  try {
    let url = `/orders?userId=${
      (await userRole()) == "admin" ? "" : await userId()
    }&page=${page}&limit=${limit}`;

    if (q) url += `&q=${q}`;

    const response = await axiosInstance.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get order
export const getOrder = async (order_id: string) => {
  try {
    const response = await axiosInstance.get(`/orders/${order_id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// update order
export const updateOrder = async (id: string, data: orderData) => {
  try {
    const response = await axiosInstance.put(`/orders/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update order status

export const updateOrderStatus = async (
  orderId: string,
  status: { status: string; productId: string }
) => {
  try {
    const response = await axiosInstance.put(
      `/orders/${orderId}/status`,

      status
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// get messages
export const getMessages = async (sender: string, receiver: string) => {
  try {
    const response = await axiosInstance.get(
      `/messages/?sender=${sender}&receiver=${receiver}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get contacts
export const getContacts = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/messages/contacts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
