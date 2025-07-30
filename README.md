# E-Learning App - Frontend

A modern, responsive e-learning platform frontend built with React and Vite. This application provides a comprehensive learning management system with course enrollment, progress tracking, and integrated payment processing.

## 🚀 Features

### Core Features
- **User Authentication**: Login, signup, and email verification
- **Course Catalog**: Browse and search available courses
- **Course Enrollment**: Enroll in courses with progress tracking
- **Learning Interface**: Module-based learning with responsive design
- **Payment Integration**: Stripe checkout for course purchases
- **Shopping Cart**: Add multiple courses to basket before checkout
- **Progress Tracking**: Visual progress indicators and completion tracking
- **Responsive Design**: Optimized for desktop and mobile devices

### User Experience
- **Dashboard**: Personal learning dashboard showing enrolled courses
- **Module Navigation**: Sidebar navigation for course modules
- **Content Management**: Support for various content types (text, media)
- **Real-time Notifications**: Toast notifications for user feedback
- **Mobile-First Design**: Adaptive UI for different screen sizes

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 4.5.0
- **State Management**: Redux Toolkit 2.2.3
- **Routing**: React Router DOM 6.23.0
- **Styling**: 
  - Bootstrap 5.3.3
  - React Bootstrap 2.10.2
  - Custom SCSS
- **UI Components**: Bootstrap Icons 1.11.3
- **Animations**: GSAP 3.12.5
- **HTTP Client**: Axios 1.7.4
- **Payment Processing**: Stripe React Stripe.js 2.8.1
- **Form Validation**: Joi 17.12.3
- **Notifications**: React Hot Toast 2.4.1

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- Backend API server running (separate repository)

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd my-elearning-app
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
Create a `.env` file in the root directory and add:
```env
VITE_API_URL=your_backend_api_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

### Backend Integration
This frontend connects to a separate backend API. Make sure to:
- Update the API URL in `src/config.js`
- Ensure the backend server is running
- Configure CORS settings on the backend
- **Backend API**: [[Link to backend repository](https://github.com/h-bann/e-learning-backend)]


### Stripe Integration
- Add your Stripe publishable key to the environment variables
- Configure webhook endpoints in your Stripe dashboard
- Ensure backend handles Stripe webhooks properly



