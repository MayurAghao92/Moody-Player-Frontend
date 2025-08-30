# 🎵 Moody Player - AI-Powered Music Recommendation

A modern web application that uses facial expression recognition to detect your mood and recommend music accordingly. Built with React, Vite, and Face-API.js.

## ✨ Features

- 🤖 **AI Mood Detection**: Real-time facial expression analysis using Face-API.js
- 🎧 **Smart Music Recommendations**: Get personalized song suggestions based on your detected mood
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations and gradients
- 📱 **Mobile Friendly**: Fully responsive design that works on all devices
- 🌈 **Dynamic Theming**: Background changes based on detected mood
- 🎵 **Interactive Music Player**: Built-in music player with controls

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: AOS (Animate On Scroll)
- **AI/ML**: Face-API.js for facial expression recognition
- **Icons**: Remix Icons
- **Fonts**: Google Fonts (Pacifico, Poppins)

## 🛠️ Installation & Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Make sure your backend server is running on `http://localhost:3000`

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 How It Works

1. **Start Camera**: Grant camera permissions to begin
2. **Detect Mood**: AI analyzes your facial expression in real-time
3. **Get Recommendations**: Receive curated songs based on your detected mood
4. **Enjoy Music**: Play and enjoy your personalized playlist

## 🎨 Supported Moods

- 😊 Happy
- 😢 Sad  
- 😠 Angry
- 😮 Surprised
- 😨 Fearful
- 🤢 Disgusted
- 😐 Neutral

## 🔧 Configuration

Make sure to place the Face-API.js models in the `public/models` directory for the facial recognition to work properly.

## 📱 Browser Compatibility

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Camera access required for mood detection functionality.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.
