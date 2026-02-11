# NewTube - A YouTube Clone with HLS Video Streaming

NewTube is a full-stack video streaming platform built with Node.js/Express backend and React frontend. It features user authentication, video uploads with automatic HLS segmentation, and real-time video playback.

## Features

- **User Authentication**: Secure signup/login with JWT tokens stored in HTTP-only cookies
- **Video Upload**: Upload videos with automatic conversion to HLS format for adaptive streaming
- **HLS Video Streaming**: Efficient streaming with quality variants (adaptive bitrate)
- **User Profiles**: Manage profile information including username and password updates
- **Video Metadata**: Store and manage video thumbnails, titles, and descriptions
- **Comments & Likes**: Interactive features for user engagement
- **Library & Favorites**: Save liked videos and view upload history
- **Auth Persistence**: Automatic session restoration on page reload via cookie-based authentication

## Project Structure

```
NewTube/
├── backend/
│   ├── app.js                 # Main Express server
│   ├── package.json
│   ├── public/                # Static files (thumbnails)
│   ├── uploads/               # Video storage (HLS segments)
│   └── src/
│       ├── config/
│       │   └── mongo.config.js       # MongoDB connection
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── onlyLoggedIn.controller.js
│       │   └── stream.controller.js
│       ├── daos/              # Data access objects
│       ├── middlewares/
│       │   ├── protect.js     # Auth middleware
│       │   └── upload.js      # Multer config
│       ├── models/            # Mongoose schemas
│       ├── routes/
│       │   ├── auth.js
│       │   ├── onlyLoggedIn.js
│       │   └── stream.js
│       ├── services/          # Business logic
│       └── utils/
│           └── ffmpeg.js      # Video processing
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── .env                   # Environment variables
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── apiCalls/          # API request functions
        ├── components/        # React components
        ├── pages/             # Route pages
        ├── store/             # Redux store
        └── styles/            # CSS modules
```

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js**: v16 or higher
- **MongoDB**: Local or remote instance
- **FFmpeg**: For video encoding (install system-wide)
  - Ubuntu/Debian: `sudo apt-get install ffmpeg`
  - macOS: `brew install ffmpeg`
  - Windows: Download from [ffmpeg.org](https://ffmpeg.org/download.html)

## Installation & Setup

### 1. Clone the Repository

```bash
cd /path/to/NewTube
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (in backend directory)
cat > .env << EOF
MONGO_URI=mongodb://localhost:27017/newtube
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
EOF

# Start the backend server
npm start
# Server runs on http://localhost:3000
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# The .env file should already be configured with:
# VITE_BACKEND_URL=http://localhost:3000

# Start the development server
npm run dev
# Frontend runs on http://localhost:5173
```

## Running the Application

### Development Mode (with auto-reload)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Listens on port 3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Opens on http://localhost:5173
```

### Production Build

**Frontend:**
```bash
cd frontend
npm run build      # Creates dist/ directory
npm run preview    # Preview production build
```

## API Endpoints

### Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/login` | Login with email/password | ❌ |
| POST | `/signup` | Create new account | ❌ |
| GET | `/me` | Get current user info (from cookie) | ✅ |

### User Profile (`/upload` - Protected Routes)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/myDetails` | Get full user profile | ✅ |
| POST | `/updateProfile` | Update username | ✅ |
| POST | `/updatePassword` | Change password | ✅ |
| GET | `/myVideos` | Get user's uploaded videos | ✅ |

### Video Operations (`/upload` - Protected Routes)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/video` | Upload video with thumbnail | ✅ |
| POST | `/addComment/:videoId` | Add comment to video | ✅ |
| DELETE | `/deleteComment/:commentId` | Delete comment | ✅ |
| PATCH | `/toggleLike/:videoId` | Like/unlike video | ✅ |
| GET | `/likedVideos` | Get user's liked videos | ✅ |

### Video Streaming (`/stream`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/masterManifest/:videoId` | HLS master manifest |
| GET | `/manifest` | Variant playlist (with token) |
| GET | `/segment` | Video segment files (with token) |

## Authentication Flow

### Initial Page Load

1. **CheckAuthComp** component runs on app initialization
2. Calls `/auth/me` endpoint with HTTP-only cookie
3. If authenticated:
   - Sets Redux `auth.isAuthenticated = true`
   - Fetches full profile from `/upload/myDetails`
   - Stores user data in Redux store
4. If not authenticated:
   - Clears auth state and redirects as needed

### Login/Signup

1. User submits credentials
2. Server sets HTTP-only cookie with JWT token
3. Frontend updates Redux state
4. Subsequent requests include cookie automatically

### Logout

1. User clicks logout
2. Frontend calls `/auth/logout` endpoint
3. Server clears the cookie
4. Redux state is cleared
5. User redirected to home page

### Protected Routes

- Profile page requires authentication via `<ProtectedRoute>` wrapper
- Upload page requires authentication via `<ProtectedRoute>` wrapper
- Logged-in users can access all features

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String (optional),
  joinDate: Date,
  createdAt: Date
}
```

### Video Model
```javascript
{
  title: String,
  description: String,
  userId: ObjectId (ref: User),
  videoPath: String,
  thumbnailPath: String,
  duration: Number,
  views: Number,
  createdAt: Date
}
```

## Video Encoding

Videos are automatically processed using FFmpeg to create HLS segments:
- **Bitrates**: 720p, 480p, 360p, 240p
- **Segment Duration**: 10 seconds
- **Codec**: H.264 (video), AAC (audio)
- **Output**: Master manifest + variant playlists + segments

## Troubleshooting

### Server won't start
```bash
# Check if port 3000 is already in use
lsof -i :3000
# Kill the process if needed
kill -9 <PID>
```

### MongoDB connection error
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in `.env` is correct
- Verify MongoDB is accessible on that address

### FFmpeg errors during video upload
- Ensure FFmpeg is installed: `ffmpeg -version`
- Restart the backend server after installing FFmpeg

### Videos won't play
- Check browser console for CORS errors
- Ensure video encoding completed successfully
- Verify HLS segments exist in `backend/uploads/videos/`

### Auth not persisting on reload
- Check that cookies are enabled in browser
- Verify `/auth/me` endpoint is responding with valid user
- Check Redux DevTools to see store state

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/newtube
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Frontend (.env)
```
VITE_BACKEND_URL=http://localhost:3000
```

## Development Commands

### Backend
```bash
npm install              # Install dependencies
npm start                # Start development server
npm test                 # Run tests (if configured)
```

### Frontend
```bash
npm install              # Install dependencies
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

## Technologies Used

### Backend
- **Express.js**: Web framework
- **MongoDB/Mongoose**: Database
- **JWT**: Authentication
- **Multer**: File upload handling
- **FFmpeg**: Video encoding
- **CORS**: Cross-origin requests

### Frontend
- **React 19**: UI framework
- **Redux Toolkit**: State management
- **React Router**: Navigation
- **Vite**: Build tool
- **HLS.js**: Video streaming player
- **React Hot Toast**: Notifications

## Performance Considerations

- **HLS Streaming**: Adaptive bitrate reduces bandwidth
- **Image Optimization**: Thumbnail compression
- **Lazy Loading**: Videos load on demand
- **Cookie-based Auth**: No token storage needed on client
- **Static File Serving**: Public directory for fast access

## Security Features

- **HTTP-only Cookies**: JWT tokens can't be accessed by JavaScript
- **CORS Protection**: Limited to frontend origin
- **Password Hashing**: Bcrypt for secure password storage
- **Protected Routes**: Authentication middleware on all sensitive endpoints
- **Token Validation**: JWT verification on each request

## Future Improvements

- [ ] Video recommendations algorithm
- [ ] Search functionality
- [ ] Playlist creation
- [ ] Video scheduling/publishing
- [ ] Analytics dashboard
- [ ] Real-time notifications
- [ ] Subscription/follow system
- [ ] Live streaming support

## License

MIT License - Feel free to use this project for learning and development.

## Support

For issues or questions, please check the console logs for error messages and ensure all prerequisites are properly installed.
