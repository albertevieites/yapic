<!-- markdownlint-disable MD033 -->

<div align="center">

# 📸 YaPIC

<img width="30%" src="./public/images/splash.png" alt="YaPIC Logo">

**A modern photo-sharing community that connects people through shared interests and visual storytelling.**

[![Deployment](https://img.shields.io/badge/Deployed%20on-Railway-blueviolet)](https://yapic.up.railway.app/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

</div>

---

## 🌟 **About YaPIC**

YaPIC is a innovative photo-sharing platform that goes beyond simple image posting. Our intelligent matching system connects users based on:

- **📷 Photo Tags** - Similar photography styles and subjects
- **💡 Personal Interests** - Shared hobbies and passions
- **🌍 Community Building** - Meaningful connections through visual storytelling

When users upload photos and build their collections, YaPIC automatically suggests potential friends with similar tastes, creating organic communities around shared visual interests.

---

## ✨ **Key Features**

### 🔐 **Security First**

- **Password Encryption** with BCrypt and configurable salt rounds
- **Session Management** with secure secrets and MongoDB session store
- **Rate Limiting** to prevent abuse and brute force attacks
- **Input Validation** with comprehensive data sanitization
- **Environment Configuration** for secure credential management

### 📱 **User Experience**

- **Smart Matching Algorithm** based on photo tags and interests
- **Profile Customization** with photo uploads via Cloudinary
- **Real-time Feed** of matched users and their content
- **Responsive Design** with Bootstrap integration
- **Intuitive Navigation** with protected routes and middleware

### 🚀 **Production Ready**

- **Performance Optimized** with database indexing and caching
- **Error Handling** with structured logging and user-friendly messages
- **Scalable Architecture** with modular design patterns
- **Monitoring Ready** with health checks and environment detection

---

## 🛠️ **Tech Stack**

| Category        | Technologies                                      |
| --------------- | ------------------------------------------------- |
| **Backend**     | Node.js, Express.js, MongoDB, Mongoose            |
| **Frontend**    | Handlebars (HBS), Bootstrap 5, Vanilla JavaScript |
| **Security**    | BCrypt, Express-Session, Rate Limiting, Helmet    |
| **File Upload** | Cloudinary, Multer                                |
| **Development** | Nodemon, Morgan, Winston (Logging)                |
| **Deployment**  | Railway, MongoDB Atlas                            |

---

## 🚀 **Quick Start**

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (Local or Atlas)
- **Cloudinary Account** (for image uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/albertevieites/yapic.git
   cd yapic
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:

   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/yapic

   # Security Configuration
   SESSION_SECRET=your-super-secret-session-key-here-64-characters-long
   SALT=10

   # Cloudinary Configuration (Image Uploads)
   CLOUDINARY_NAME=your-cloudinary-name
   CLOUDINARY_KEY=your-cloudinary-api-key
   CLOUDINARY_SECRET=your-cloudinary-api-secret

   # Server Configuration
   PORT=3001
   NODE_ENV=development
   ```

4. **Generate Secure Session Secret**

   ```bash
   npm run generate-secret
   ```

5. **Seed Database (Optional)**

   ```bash
   npm run seedUsers
   npm run seedPosts
   ```

6. **Start Development Server**

   ```bash
   npm run dev
   ```

7. **Open Your Browser**
   Navigate to `http://localhost:3001`

---

## 📋 **Available Scripts**

```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run seedUsers    # Populate database with sample users
npm run seedPosts    # Populate database with sample posts
npm run generate-secret # Generate secure session secret
npm run check-env    # Verify environment variables setup
```

---

## 🗃️ **Database Models**

### 👤 **User Model**

```javascript
{
  username: String,        // Unique, 3-20 characters
  password: String,        // BCrypt hashed, min 8 chars
  email: String,          // Unique, validated format
  age: Number,            // Optional
  genre: [String],        // From predefined genders
  country: [String],      // From predefined countries
  interests: [String],    // From predefined interests
  userPhotoUrl: String,   // Cloudinary URL
  posts: [ObjectId]       // Reference to Post documents
}
```

### 📷 **Post Model**

```javascript
{
  postPhotoUrl: String,   // Cloudinary URL
  owner: ObjectId,        // Reference to User
  title: String,          // Optional, max 100 chars
  description: String,    // Required, 10-300 chars
  tags: [String],        // Max 5 tags from predefined list
  date: Date,            // Auto-generated timestamp
  createdAt: Date,       // Auto-generated
  updatedAt: Date        // Auto-generated
}
```

---

## 🛣️ **API Routes**

### 🔓 **Public Routes**

| Method | Route     | Description                                   |
| ------ | --------- | --------------------------------------------- |
| `GET`  | `/`       | Landing page or redirect to home if logged in |
| `GET`  | `/signup` | User registration form                        |
| `POST` | `/signup` | Process user registration                     |
| `GET`  | `/login`  | User login form                               |
| `POST` | `/login`  | Process user authentication                   |

### 🔒 **Protected Routes**

| Method | Route                  | Description                          |
| ------ | ---------------------- | ------------------------------------ |
| `GET`  | `/home/:userId`        | User dashboard with matches and feed |
| `GET`  | `/profile/:id`         | User profile view and edit           |
| `POST` | `/profile`             | Update user profile                  |
| `GET`  | `/post/new`            | Create new post form                 |
| `POST` | `/post/new`            | Process new post creation            |
| `POST` | `/post/delete/:postId` | Delete user's post                   |
| `GET`  | `/match/:matchId`      | View potential match profile         |
| `GET`  | `/logout`              | Destroy session and logout           |

---

## 🔧 **Configuration**

### 🌍 **Environment Variables**

| Variable            | Required | Description                        | Example                           |
| ------------------- | -------- | ---------------------------------- | --------------------------------- |
| `MONGODB_URI`       | ✅       | MongoDB connection string          | `mongodb://localhost:27017/yapic` |
| `SESSION_SECRET`    | ✅       | Session encryption key (64+ chars) | `your-super-secret-key...`        |
| `CLOUDINARY_NAME`   | ✅       | Cloudinary account name            | `your-cloudinary-name`            |
| `CLOUDINARY_KEY`    | ✅       | Cloudinary API key                 | `123456789012345`                 |
| `CLOUDINARY_SECRET` | ✅       | Cloudinary API secret              | `abcdef123456...`                 |
| `SALT`              | ⚠️       | BCrypt salt rounds                 | `10` (default)                    |
| `PORT`              | ⚠️       | Server port                        | `3001` (default)                  |
| `NODE_ENV`          | ⚠️       | Environment mode                   | `development`                     |

### 🔍 **Environment Setup Verification**

```bash
node scripts/check-env-vars.js
```

---

## 🏗️ **Project Structure**

```
yapic/
├── 📁 config/           # Application configuration
│   ├── cloudinary.js    # Cloudinary setup
│   ├── index.js         # Middleware configuration
│   └── logger.js        # Winston logger setup
├── 📁 constants/        # Application constants
│   ├── countries.js     # Country options
│   ├── genders.js       # Gender options
│   ├── interests.js     # Interest categories
│   └── tags.js          # Post tag options
├── 📁 middlewares/      # Custom middleware
│   ├── isLoggedIn.js    # Authentication middleware
│   ├── isNotLoggedIn.js # Guest-only middleware
│   └── rateLimiter.js   # Rate limiting middleware
├── 📁 models/           # Database models
│   ├── User.model.js    # User schema and model
│   └── Post.model.js    # Post schema and model
├── 📁 routes/           # Application routes
│   ├── auth-routes.js   # Authentication routes
│   ├── private-routes.js # Protected user routes
│   └── index.js         # Public and main routes
├── 📁 scripts/          # Utility scripts
│   ├── check-env-vars.js # Environment verification
│   └── generate-session-secret.js # Secret generator
├── 📁 public/           # Static assets
│   ├── images/          # Application images
│   ├── js/              # Client-side JavaScript
│   └── stylesheets/     # CSS files
└── 📁 views/            # Handlebars templates
    ├── auth/            # Authentication views
    ├── private/         # Protected views
    └── layouts/         # Layout templates
```

---

## 🚀 **Deployment**

### Railway Deployment

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-uri
SESSION_SECRET=your-production-session-secret
# ... other production configs
```

---

## 🤝 **Contributing**

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 **Contributors**

<div align="center">

### Development Team

<a href="https://github.com/albertevieites">
  <img width="80" height="80" style="border-radius: 50%; margin: 10px;" src="https://avatars.githubusercontent.com/u/73227233?v=4" alt="Alberte Vieites"/>
</a>
<a href="https://github.com/pablodellacassa">
  <img width="80" height="80" style="border-radius: 50%; margin: 10px;" src="https://avatars.githubusercontent.com/u/52871180?v=4" alt="Pablo Della Cassa"/>
</a>

**[Alberte Vieites](https://github.com/albertevieites)** & **[Pablo Della Cassa](https://github.com/pablodellacassa)**

</div>

---

## 🔗 **Links**

- **🌐 Live Demo:** [yapic.up.railway.app](https://yapic.up.railway.app/)
- **📖 Documentation:** [GitHub Wiki](https://github.com/albertevieites/yapic/wiki)
- **🐛 Issues:** [GitHub Issues](https://github.com/albertevieites/yapic/issues)
- **💬 Discussions:** [GitHub Discussions](https://github.com/albertevieites/yapic/discussions)

---

<div align="center">

**Made with ❤️ and 📸 by the YaPIC Team**

_Connecting people through the power of visual storytelling_

</div>
