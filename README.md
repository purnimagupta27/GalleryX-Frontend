# Frontend Folder Structure

This document outlines the directory layout of the Pinterest clone frontend application and details the purpose and contents of each folder and file.

---

## 📁 Directory Tree

```plaintext
frontend/
├── .env                         # Environment variables (API base URL, etc.)
├── .gitignore                   # Files and directories ignored by Git
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry point for Vite
├── package.json                 # Project dependencies, scripts, and metadata
├── package-lock.json            # Locked dependency tree
├── vite.config.js               # Vite build and plugin configuration
├── public/                      # Static assets served directly as-is
└── src/                         # Application source code
    ├── App.jsx                  # Main application component & route declarations
    ├── main.jsx                 # React root mounting and initialization
    ├── index.css                # Global CSS styles and Tailwind CSS imports
    │
    ├── assets/                  # Static image assets and graphics
    │   ├── background.png       # Background image for landing/auth sections
    │   ├── feature_follow.png   # Follow feature illustration
    │   ├── feature_like.png     # Like feature illustration
    │   ├── feature_private.png  # Private collection feature illustration
    │   ├── feature_save.png     # Bookmark/save feature illustration
    │   ├── feature_share.png    # Share feature illustration
    │   ├── form-background.png  # Background graphic for auth forms
    │   └── logo.png             # Application logo image
    │
    ├── components/              # Reusable UI components
    │   ├── Bookmark.jsx         # Modal / dropdown to save posts to collections
    │   ├── CTA.jsx              # Call-to-action banner for landing page
    │   ├── Comments.jsx         # Comments section with add, reply, and delete
    │   ├── EditPost.jsx         # Modal/form to update post details
    │   ├── Features.jsx         # Feature showcase slider/cards for landing page
    │   ├── Footer.jsx           # Landing page footer
    │   ├── HeroSection.jsx      # Hero banner component for landing page
    │   ├── HomeNavbar.jsx       # Main navigation bar for authenticated users
    │   ├── ImageUpload.jsx      # Modal dialog for uploading and publishing pins
    │   ├── LandingNavbar.jsx    # Navigation header for unauthenticated visitors
    │   ├── Likes.jsx            # Like button and counter component
    │   ├── Logo.jsx             # Pinterest branding and SVG/image logo
    │   ├── Masonry.jsx          # Dynamic masonry grid layout for pins
    │   └── Shimmer.jsx          # Shimmer/skeleton loading placeholders
    │
    ├── pages/                   # Top-level view and route components
    │   ├── BookmarkPage.jsx     # User's saved collections and boards overview
    │   ├── BookmarkPostPage.jsx # View of all posts inside a specific collection
    │   ├── HomePage.jsx         # Main feed page showing masonry pins & search
    │   ├── LandingPage.jsx      # Public landing page with showcase & CTAs
    │   ├── LoginPage.jsx        # User login form page
    │   ├── PostPage.jsx         # Detailed pin view (image, author, comments)
    │   ├── ProfilePage.jsx      # Logged-in user's own profile and saved posts
    │   ├── RegisterPage.jsx     # User signup and registration page
    │   └── UserProfilePage.jsx  # Public profile view for other creators
    │
    ├── services/                # API communication layers (Axios requests)
    │   ├── auth.service.js      # Authentication endpoints (login, register, session)
    │   ├── collection.service.js# Board/collection CRUD and post-saving APIs
    │   ├── comment.service.js   # Comment creation, fetching, and deletion APIs
    │   ├── feed.service.js      # Feed retrieval and search APIs
    │   ├── follows.service.js   # Follow and unfollow user endpoints
    │   ├── likes.service.js     # Post like and unlike endpoints
    │   ├── post.service.js      # Post creation, editing, and retrieval APIs
    │   └── user.service.js      # User profile fetching and update endpoints
    │
    └── utils/                   # Helpers, utilities, and configuration
        ├── api.js               # Configured Axios instance with baseURL & headers
        ├── features.js          # Static configuration for landing page features
        └── masonryImages.js     # Sample data and configuration for masonry layouts
```

---

## 📂 Detailed Folder Contents

### 1. `root/`
Files at the root level configure tooling, dependencies, and environment:
* **`.env`**: Stores environment variables such as `VITE_API_URL`.
* **`index.html`**: Host HTML template where React mounts to `<div id="root">`.
* **`package.json`**: Lists dependencies (`react`, `react-router-dom`, `tailwindcss`, `axios`, `framer-motion`, `lucide-react`, `react-hot-toast`, `swiper`) and npm scripts.
* **`vite.config.js`**: Vite configuration file bundling React and Tailwind CSS plugins.
* **`eslint.config.js`**: Linter configuration for maintaining code quality and React best practices.

---

### 2. `src/`
The core React source directory:
* **`main.jsx`**: Application entry point that initializes the React DOM root.
* **`App.jsx`**: Defines the application layout, global toast notifications (`<Toaster />`), and client-side route definitions.
* **`index.css`**: Global stylesheet including Tailwind directives and custom scrollbar / theme styling.

---

### 3. `src/assets/`
Contains static visual assets:
* **`logo.png`**: Brand logo asset.
* **`background.png` & `form-background.png`**: Background textures for auth and landing views.
* **`feature_*.png`**: Illustrative banners showcasing features (saving, liking, following, sharing, and private boards).

---

### 4. `src/components/`
Modular, reusable UI and layout components:
* **`HomeNavbar.jsx`**: Navigation bar with search input, notifications, user avatar, upload button, and bookmarks link.
* **`LandingNavbar.jsx`**: Navigation bar for unauthenticated landing view with Login and Sign Up buttons.
* **`Masonry.jsx`**: Responsive Pinterest-style staggered column layout for displaying posts.
* **`ImageUpload.jsx`**: Drag-and-drop file upload modal allowing users to set a title, description, tags, and publish pins.
* **`Bookmark.jsx`**: Dropdown/modal component for choosing or creating a board to save pins into.
* **`Comments.jsx`**: Comment thread with support for posting, replying, deleting, and liking comments.
* **`EditPost.jsx`**: Modal component to edit existing post titles, descriptions, and tags.
* **`Likes.jsx`**: Interactive heart/like button with real-time state updates.
* **`Logo.jsx`**: Brand icon and text link component.
* **`Shimmer.jsx`**: Placeholder shimmer/skeleton loaders rendered while fetching images.
* **`HeroSection.jsx`**: Hero banner section on the landing page.
* **`Features.jsx`**: Carousel/cards highlighting platform capabilities.
* **`CTA.jsx`**: Call-to-action banner prompting visitors to sign up.
* **`Footer.jsx`**: Footer section with links and attribution.

---

### 5. `src/pages/`
Page-level components mapped to routes:
* **`LandingPage.jsx`** (`/`): Public introduction page for new visitors.
* **`LoginPage.jsx`** (`/login`): Authentication page for user login.
* **`RegisterPage.jsx`** (`/register`): User account registration page.
* **`HomePage.jsx`** (`/homepage`): Authenticated user feed displaying posts via masonry grid.
* **`PostPage.jsx`** (`/post/:postId`): Detailed view for an individual pin, comments, and related pins.
* **`ProfilePage.jsx`** (`/profile`): Active user's profile displaying created posts, boards, and account details.
* **`UserProfilePage.jsx`** (`/profile/:userId`): Creator profile view for inspecting other users and following them.
* **`BookmarkPage.jsx`** (`/my-bookmarks`): Screen displaying all user-created boards and saved collections.
* **`BookmarkPostPage.jsx`** (`/bookmarks/:bookmarkId`): Grid view displaying all pins saved inside a specific board.

---

### 6. `src/services/`
Axios service modules handling API requests to the backend:
* **`auth.service.js`**: Handles authentication (register, login, logout, current user check).
* **`post.service.js`**: Handles creating, fetching, editing, and deleting posts.
* **`feed.service.js`**: Fetches home feed and query-based search results.
* **`collection.service.js`**: Manages boards/collections and saving/removing posts from boards.
* **`comment.service.js`**: Handles fetching, posting, liking, and deleting comments.
* **`likes.service.js`**: Handles liking and unliking pins.
* **`follows.service.js`**: Handles following and unfollowing creators.
* **`user.service.js`**: Fetches and updates user profile data.

---

### 7. `src/utils/`
Shared utility functions, clients, and mock/static data:
* **`api.js`**: Pre-configured Axios instance configured with `baseURL` and `withCredentials: true`.
* **`features.js`**: Static metadata and descriptions for landing page feature highlights.
* **`masonryImages.js`**: Sample image sets and dimension ratios used for masonry displays.
