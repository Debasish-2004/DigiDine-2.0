# DIGIDINE - Food Delivery & Waste Reduction App

A web application similar to Swiggy, with an additional feature for reducing food waste by connecting restaurants with volunteers to distribute leftover food.

## Features

### 🍽️ Food Ordering
- **Landing Page**: Welcome page with featured restaurants
- **Restaurant Listing**: Browse all restaurants with filtering by cuisine and search
- **Restaurant Details**: View menu items, add to cart
- **Shopping Cart**: Manage items, update quantities
- **Order Summary**: Review order and place delivery request

### ♻️ Food Waste Reduction
- **Restaurant Dashboard**: Restaurants can list leftover/unsold food after closing
- **Leftover Food Listings**: Volunteers can view available leftover food
- **Pickup Request Flow**: Volunteers can request pickup for distribution

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern, responsive design with Swiggy-like styling
- **JavaScript (ES6+)**: DOM manipulation and AJAX
- **JSON**: Data storage (simulated backend)
- **LocalStorage**: Client-side data persistence

## Project Structure

```
digidine/
├── index.html                  # Landing page
├── restaurants.html            # Restaurant listing page
├── restaurant-detail.html      # Restaurant menu and details
├── cart.html                   # Shopping cart
├── order-summary.html          # Order confirmation
├── restaurant-dashboard.html   # Restaurant dashboard for leftover food
├── leftover-food.html          # Leftover food listings for volunteers
├── css/
│   └── styles.css             # Main stylesheet
├── js/
│   └── utils.js               # Utility functions (Cart, API, Toast)
└── data/
    ├── restaurants.json        # Restaurant data
    ├── menus.json             # Menu items by restaurant
    ├── leftover-food.json     # Leftover food listings
    └── pickup-requests.json   # Pickup request data
```

## Getting Started

1. **Open the application**: Simply open `index.html` in a modern web browser
   - For best experience, use a local server (see below)

2. **Using a Local Server** (Recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
   Then navigate to `http://localhost:8000`

## Usage Guide

### For Customers
1. Browse restaurants on the **Restaurants** page
2. Click on a restaurant to view its menu
3. Add items to cart
4. Review cart and proceed to checkout
5. Fill in delivery details and place order

### For Restaurants
1. Go to **Restaurant Dashboard**
2. Click "Add Leftover Food Listing"
3. Fill in food items, quantity, pickup time, and location
4. Submit to create listing

### For Volunteers
1. Visit **Leftover Food** page
2. Browse available leftover food listings
3. Click "Request Pickup" on a listing
4. Fill in volunteer details and pickup time
5. Submit request

## Features in Detail

### Navigation
- Sticky navbar with logo and navigation links
- Cart badge showing item count
- Responsive mobile menu

### Filtering & Search
- Filter restaurants by cuisine type
- Search restaurants by name, cuisine, or description
- Filter leftover food by status (available/requested)

### Cart Management
- Add/remove items
- Update quantities
- Real-time total calculation
- Persistent cart (localStorage)

### Toast Notifications
- Success, error, and info notifications
- Auto-dismiss after 3 seconds
- Smooth animations

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly buttons and interactions

## Data Storage

The application uses:
- **JSON files**: Initial data (restaurants, menus, sample listings)
- **LocalStorage**: User-generated data (cart, new listings, pickup requests)

All data persists in the browser's localStorage, so it will remain even after page refresh.

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Design Philosophy

- **Swiggy-inspired UI**: Clean, modern, minimal design
- **Color Scheme**: Orange primary (#fc8019), green secondary (#60b246)
- **Typography**: System fonts for fast loading
- **Cards & Shadows**: Modern card-based layout with subtle shadows
- **Responsive**: Mobile-first, works on all screen sizes

## Future Enhancements (Not Implemented)

- User authentication
- Payment integration
- Real backend API
- Order tracking
- Restaurant ratings and reviews
- Map integration for delivery tracking

## Notes

- This is a **frontend-only** application
- No backend server required
- All data is stored in browser localStorage
- Images use Unsplash placeholder URLs
- Perfect for demonstration and prototyping

## License

This project is created for educational/demonstration purposes.

