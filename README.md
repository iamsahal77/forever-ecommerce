# Forever Ecommerce

A modern, full-stack ecommerce platform for seamless online shopping and efficient store management.

## Features
- Responsive, user-friendly frontend
- Secure user authentication
- Product catalog and search
- Shopping cart and order management
- Admin dashboard for store management
- Cloud image uploads (Cloudinary)
- Integrated Stripe & Razorpay payments

## Tech Stack
- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Cloud:** Cloudinary
- **Payments:** Stripe, Razorpay

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB instance
- Cloudinary account (for image uploads)
- Stripe & Razorpay accounts (for payments)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/forever-ecommerce.git
   cd forever-ecommerce
   ```

2. **Install dependencies:**
   - For backend:
     ```bash
     cd backend
     npm install
     ```
   - For frontend:
     ```bash
     cd ../frontend
     npm install
     ```
   - For admin dashboard:
     ```bash
     cd ../admin
     npm install
     ```

3. **Set up environment variables:**
   - Create `.env` files in the `backend` directory for MongoDB, Cloudinary, Stripe, and Razorpay credentials.

4. **Run the development servers:**
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm run dev
     ```
   - Admin:
     ```bash
     cd ../admin
     npm run dev
     ```

## Folder Structure
- `frontend/` – User-facing web app
- `admin/` – Admin dashboard
- `backend/` – REST API and server logic

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
