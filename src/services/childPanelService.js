import api from "./api";

// Get all child panels for the current user
export const getChildPanels = async () => {
  try {
    const response = await api.get("/child-panels");
    return response.data;
  } catch (error) {
    console.error("Error fetching child panels:", error);
    throw error.response?.data || error;
  }
};

// Get a single child panel by ID
export const getChildPanel = async (panelId) => {
  try {
    const response = await api.get(`/child-panels/${panelId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching child panel:", error);
    throw error.response?.data || error;
  }
};

// Create a new child panel
export const createChildPanel = async (panelData) => {
  try {
    const response = await api.post("/child-panels", panelData);
    return response.data;
  } catch (error) {
    console.error("Error creating child panel:", error);
    throw error.response?.data || error;
  }
};

// Update a child panel
export const updateChildPanel = async (panelId, panelData) => {
  try {
    const response = await api.put(`/child-panels/${panelId}`, panelData);
    return response.data;
  } catch (error) {
    console.error("Error updating child panel:", error);
    throw error.response?.data || error;
  }
};

// Delete a child panel
export const deleteChildPanel = async (panelId) => {
  try {
    const response = await api.delete(`/child-panels/${panelId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting child panel:", error);
    throw error.response?.data || error;
  }
};

// Get child panel statistics
export const getChildPanelStats = async (panelId) => {
  try {
    const response = await api.get(`/child-panels/${panelId}/stats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching child panel stats:", error);
    throw error.response?.data || error;
  }
};

// Get child panel users
export const getChildPanelUsers = async (panelId, params = {}) => {
  try {
    const response = await api.get(`/child-panels/${panelId}/users`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching child panel users:", error);
    throw error.response?.data || error;
  }
};

// Get child panel orders
export const getChildPanelOrders = async (panelId, params = {}) => {
  try {
    const response = await api.get(`/child-panels/${panelId}/orders`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching child panel orders:", error);
    throw error.response?.data || error;
  }
};

// Get child panel transactions
export const getChildPanelTransactions = async (panelId, params = {}) => {
  try {
    const response = await api.get(`/child-panels/${panelId}/transactions`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching child panel transactions:", error);
    throw error.response?.data || error;
  }
};

// Add balance to child panel
export const addChildPanelBalance = async (panelId, amount) => {
  try {
    const response = await api.post(`/child-panels/${panelId}/add-balance`, { amount });
    return response.data;
  } catch (error) {
    console.error("Error adding balance:", error);
    throw error.response?.data || error;
  }
};

// Pay subscription for child panel
export const payChildPanelSubscription = async (panelId, paymentData) => {
  try {
    const response = await api.post(`/child-panels/${panelId}/pay-subscription`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error paying subscription:", error);
    throw error.response?.data || error;
  }
};

// Generate API key for child panel
export const generateChildPanelApiKey = async (panelId) => {
  try {
    const response = await api.post(`/child-panels/${panelId}/generate-api-key`);
    return response.data;
  } catch (error) {
    console.error("Error generating API key:", error);
    throw error.response?.data || error;
  }
};

// Suspend/Activate child panel
export const toggleChildPanelStatus = async (panelId, status) => {
  try {
    const response = await api.post(`/child-panels/${panelId}/toggle-status`, { status });
    return response.data;
  } catch (error) {
    console.error("Error toggling child panel status:", error);
    throw error.response?.data || error;
  }
};

