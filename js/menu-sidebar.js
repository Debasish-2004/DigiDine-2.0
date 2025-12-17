// Menu sidebar functions - shared across all pages
function toggleMenuSidebar() {
    const sidebar = document.getElementById('menu-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    if (!sidebar.classList.contains('active')) {
        const content = document.getElementById('sidebar-section-content');
        if (content) content.style.display = 'none';
    }
}

function showOrdersSection() {
    const content = document.getElementById('sidebar-section-content');
    content.style.display = 'block';
    const orders = Orders.getAllOrders();
    
    if (orders.length === 0) {
        content.innerHTML = `
            <div class="order-sidebar-empty">
                <div class="order-sidebar-empty-icon">📦</div>
                <h3>No orders yet</h3>
                <p>Your orders will appear here</p>
            </div>
        `;
        return;
    }

    content.innerHTML = `
        <h3 style="margin-bottom: 1rem;">My Orders</h3>
        ${orders.map(order => {
            const statusSteps = [
                { key: 'cooking', label: 'Cooking', icon: '👨‍🍳' },
                { key: 'shipped', label: 'Shipped', icon: '🚚' },
                { key: 'delivered', label: 'Delivered', icon: '✓' }
            ];
            const currentStatusIndex = statusSteps.findIndex(s => s.key === order.status);
            
            return `
                <div class="order-item" style="margin-bottom: 1rem;">
                    <div class="order-item-header">
                        <div>
                            <div class="order-item-id">Order #${order.id}</div>
                            <div class="order-item-date">${formatDate(order.createdAt)}</div>
                        </div>
                    </div>
                    <div class="order-item-items">
                        ${order.items.map(item => `
                            <div class="order-item-food">
                                <span class="order-item-food-name">${item.name}</span>
                                <span class="order-item-food-quantity">× ${item.quantity}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-status">
                        <div class="order-status-label">Order Status</div>
                        <div class="order-status-tracker">
                            ${statusSteps.map((step, index) => {
                                const isActive = index === currentStatusIndex;
                                const isCompleted = index < currentStatusIndex;
                                return `
                                    <div class="status-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}">
                                        <div class="status-icon"></div>
                                        <div class="status-text">${step.label}</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    <div class="order-item-total">
                        <span>Total</span>
                        <span>${formatCurrency(order.total)}</span>
                    </div>
                </div>
            `;
        }).join('')}
    `;
}

function showSavedAddressesSection() {
    const content = document.getElementById('sidebar-section-content');
    content.style.display = 'block';
    const addresses = SavedAddresses.get();
    
    content.innerHTML = `
        <h3 style="margin-bottom: 1rem;">Saved Addresses</h3>
        ${addresses.length === 0 ? `
            <div class="order-sidebar-empty">
                <div class="order-sidebar-empty-icon">📍</div>
                <h3>No saved addresses</h3>
                <p>Add addresses for faster checkout</p>
            </div>
        ` : addresses.map(addr => `
            <div class="order-item" style="margin-bottom: 1rem;">
                <div class="order-item-header">
                    <div>
                        <div class="order-item-id">${addr.name || 'Address'}</div>
                        <div class="order-item-date">${addr.address}</div>
                        ${addr.phone ? `<div style="margin-top: 0.5rem; color: var(--text-light);">📞 ${addr.phone}</div>` : ''}
                    </div>
                </div>
            </div>
        `).join('')}
        <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="addNewAddress()">Add New Address</button>
    `;
}

function showSavedRestaurantsSection() {
    const content = document.getElementById('sidebar-section-content');
    content.style.display = 'block';
    const savedIds = SavedRestaurants.get();
    
    content.innerHTML = `
        <h3 style="margin-bottom: 1rem;">Saved Restaurants</h3>
        ${savedIds.length === 0 ? `
            <div class="order-sidebar-empty">
                <div class="order-sidebar-empty-icon">❤️</div>
                <h3>No saved restaurants</h3>
                <p>Save your favorite restaurants</p>
            </div>
        ` : '<p style="color: var(--text-light);">Restaurants will be loaded here</p>'}
    `;
}

function showSavedDishesSection() {
    const content = document.getElementById('sidebar-section-content');
    content.style.display = 'block';
    const savedIds = SavedDishes.get();
    
    content.innerHTML = `
        <h3 style="margin-bottom: 1rem;">Saved Dishes</h3>
        ${savedIds.length === 0 ? `
            <div class="order-sidebar-empty">
                <div class="order-sidebar-empty-icon">🍽️</div>
                <h3>No saved dishes</h3>
                <p>Save your favorite dishes</p>
            </div>
        ` : '<p style="color: var(--text-light);">Dishes will be loaded here</p>'}
    `;
}

function showHelpSection() {
    const content = document.getElementById('sidebar-section-content');
    content.style.display = 'block';
    content.innerHTML = `
        <h3 style="margin-bottom: 1rem;">Help & Support</h3>
        <div style="line-height: 1.8;">
            <p><strong>Need Help?</strong></p>
            <p>Contact us:</p>
            <p>📧 Email: support@digidine.com</p>
            <p>📞 Phone: +91 1800-123-4567</p>
            <p style="margin-top: 1.5rem;"><strong>FAQs</strong></p>
            <p>• How to place an order?</p>
            <p>• How to track my order?</p>
            <p>• How to cancel an order?</p>
            <p>• Payment options</p>
        </div>
    `;
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('restaurant-auth');
        Toast.success('Logged out successfully');
        toggleMenuSidebar();
    }
}

function addNewAddress() {
    const name = prompt('Enter address name (e.g., Home, Office):');
    if (!name) return;
    
    const address = prompt('Enter full address:');
    if (!address) return;
    
    const phone = prompt('Enter phone number (optional):') || '';
    
    SavedAddresses.add({ name, address, phone });
    Toast.success('Address saved successfully!');
    showSavedAddressesSection();
}

// Update order badge on page load
document.addEventListener('DOMContentLoaded', function() {
    const activeOrders = Orders.getActiveOrders();
    const badge = document.getElementById('order-badge');
    const ordersBadge = document.getElementById('orders-badge');
    if (badge) {
        const count = activeOrders.length;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
    if (ordersBadge) {
        const count = activeOrders.length;
        ordersBadge.textContent = count;
        ordersBadge.style.display = count > 0 ? 'flex' : 'none';
    }
});

