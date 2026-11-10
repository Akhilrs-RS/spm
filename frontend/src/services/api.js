const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Utility wrapper for fetch with timeout and error handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API request failed with status ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Categories
  getCategories: () => request('/categories'),
  getCategoryById: (id) => request(`/categories/${id}`),

  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') query.append('category', params.category);
    if (params.subcategory && params.subcategory !== 'all') query.append('subcategory', params.subcategory);
    if (params.search) query.append('search', params.search);
    if (params.dietary && params.dietary !== 'all') query.append('dietary', params.dietary);
    if (params.deal) query.append('deal', 'true');
    if (params.minPrice) query.append('minPrice', params.minPrice);
    if (params.maxPrice) query.append('maxPrice', params.maxPrice);
    if (params.sortBy) query.append('sortBy', params.sortBy);

    const queryString = query.toString();
    return request(`/products${queryString ? `?${queryString}` : ''}`);
  },
  getProductById: (id) => request(`/products/${id}`),
  getFlashDeals: () => request('/products/flash-deals'),

  // Coupons
  validateCoupon: (code, subtotal) =>
    request('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code, subtotal })
    }),

  // User Profile & Addresses
  getUserProfile: (userId = 'user-1') => request(`/user/profile?userId=${userId}`),
  updateUserProfile: (profile, userId = 'user-1') =>
    request(`/user/profile?userId=${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profile)
    }),
  getUserAddresses: (userId = 'user-1') => request(`/user/addresses?userId=${userId}`),
  addUserAddress: (address, userId = 'user-1') =>
    request(`/user/addresses?userId=${userId}`, {
      method: 'POST',
      body: JSON.stringify(address)
    }),

  // Orders
  getOrders: (userId = 'user-1') => request(`/orders?userId=${userId}`),
  getOrderById: (orderId) => request(`/orders/${orderId}`),
  createOrder: (orderPayload) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderPayload)
    }),

  // Wishlist
  getWishlist: (userId = 'user-1') => request(`/wishlist?userId=${userId}`),
  toggleWishlist: (productId, userId = 'user-1') =>
    request('/wishlist/toggle', {
      method: 'POST',
      body: JSON.stringify({ productId, userId })
    })
};

export default api;
