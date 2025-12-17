// Utility functions for the application

// Toast notification system
const Toast = {
  show: function(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container') || this.createContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    toast.innerHTML = `
      <span style="font-size: 1.2rem;">${icon}</span>
      <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },
  
  createContainer: function() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  },
  
  success: function(message) {
    this.show(message, 'success');
  },
  
  error: function(message) {
    this.show(message, 'error');
  },
  
  info: function(message) {
    this.show(message, 'info');
  }
};

// AJAX helper for fetching JSON files
const API = {
  get: async function(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      Toast.error('Failed to load data. Please refresh the page.');
      throw error;
    }
  },
  
  post: async function(url, data) {
    // Since we're using JSON files, we'll simulate POST by updating localStorage
    // In a real app, this would be an actual POST request
    try {
      const existingData = JSON.parse(localStorage.getItem(url) || '[]');
      const newData = { ...data, id: Date.now() };
      existingData.push(newData);
      localStorage.setItem(url, JSON.stringify(existingData));
      return newData;
    } catch (error) {
      console.error('API Error:', error);
      Toast.error('Failed to save data.');
      throw error;
    }
  },
  
  put: async function(url, data) {
    // Simulate PUT by updating localStorage
    try {
      const existingData = JSON.parse(localStorage.getItem(url) || '[]');
      const index = existingData.findIndex(item => item.id === data.id);
      if (index !== -1) {
        existingData[index] = { ...existingData[index], ...data };
        localStorage.setItem(url, JSON.stringify(existingData));
        return existingData[index];
      }
      throw new Error('Item not found');
    } catch (error) {
      console.error('API Error:', error);
      Toast.error('Failed to update data.');
      throw error;
    }
  }
};

// Cart management
const Cart = {
  get: function() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  },
  
  add: function(item) {
    const cart = this.get();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateBadge();
    return cart;
  },
  
  remove: function(itemId) {
    const cart = this.get();
    const filteredCart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(filteredCart));
    this.updateBadge();
    return filteredCart;
  },
  
  updateQuantity: function(itemId, quantity) {
    const cart = this.get();
    const item = cart.find(cartItem => cartItem.id === itemId);
    
    if (item) {
      if (quantity <= 0) {
        return this.remove(itemId);
      }
      item.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.updateBadge();
    }
    
    return cart;
  },
  
  clear: function() {
    localStorage.removeItem('cart');
    this.updateBadge();
  },
  
  getTotal: function() {
    const cart = this.get();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  getCount: function() {
    const cart = this.get();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },
  
  updateBadge: function() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      const count = this.getCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};

// Format currency
function formatCurrency(amount) {
  return `₹${amount.toFixed(2)}`;
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Order management
const Orders = {
  get: function() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  },
  
  add: function(order) {
    const orders = this.get();
    const newOrder = {
      ...order,
      id: Date.now(),
      status: 'cooking',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    orders.unshift(newOrder); // Add to beginning
    localStorage.setItem('orders', JSON.stringify(orders));
    return newOrder;
  },
  
  updateStatus: function(orderId, status) {
    const orders = this.get();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      localStorage.setItem('orders', JSON.stringify(orders));
    }
    return order;
  },
  
  getActiveOrders: function() {
    return this.get().filter(order => order.status !== 'delivered');
  },
  
  getAllOrders: function() {
    return this.get();
  }
};

// Saved Addresses management
const SavedAddresses = {
  get: function() {
    return JSON.parse(localStorage.getItem('saved-addresses') || '[]');
  },
  
  add: function(address) {
    const addresses = this.get();
    const newAddress = {
      ...address,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    addresses.push(newAddress);
    localStorage.setItem('saved-addresses', JSON.stringify(addresses));
    return newAddress;
  },
  
  remove: function(addressId) {
    const addresses = this.get();
    const filtered = addresses.filter(a => a.id !== addressId);
    localStorage.setItem('saved-addresses', JSON.stringify(filtered));
    return filtered;
  }
};

// Saved Restaurants management
const SavedRestaurants = {
  get: function() {
    return JSON.parse(localStorage.getItem('saved-restaurants') || '[]');
  },
  
  add: function(restaurantId) {
    const saved = this.get();
    if (!saved.includes(restaurantId)) {
      saved.push(restaurantId);
      localStorage.setItem('saved-restaurants', JSON.stringify(saved));
    }
    return saved;
  },
  
  remove: function(restaurantId) {
    const saved = this.get();
    const filtered = saved.filter(id => id !== restaurantId);
    localStorage.setItem('saved-restaurants', JSON.stringify(filtered));
    return filtered;
  },
  
  isSaved: function(restaurantId) {
    return this.get().includes(restaurantId);
  }
};

// Saved Dishes management
const SavedDishes = {
  get: function() {
    return JSON.parse(localStorage.getItem('saved-dishes') || '[]');
  },
  
  add: function(dishId) {
    const saved = this.get();
    if (!saved.includes(dishId)) {
      saved.push(dishId);
      localStorage.setItem('saved-dishes', JSON.stringify(saved));
    }
    return saved;
  },
  
  remove: function(dishId) {
    const saved = this.get();
    const filtered = saved.filter(id => id !== dishId);
    localStorage.setItem('saved-dishes', JSON.stringify(filtered));
    return filtered;
  },
  
  isSaved: function(dishId) {
    return this.get().includes(dishId);
  }
};

// Initialize cart badge on page load
document.addEventListener('DOMContentLoaded', function() {
  Cart.updateBadge();
});

