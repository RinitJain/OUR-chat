# WhatsApp Clone

This is a personalized WhatsApp clone built using React, TypeScript, and Tailwind CSS. The application is designed exclusively for two users and features a modern, mobile-friendly interface with smooth animations.

## Features

### Authentication
- Direct login (No sign-up)
- Hardcoded or Firebase Auth (email/password)

### Chat UI
- Bubble-style chat design with animated message appearance
- Display typing indicators
- Show "last seen" and profile picture
- Read receipts (✓✓ for seen messages)
- Support for text, images, GIFs, and voice messages

### Modes
- **Love Mode ❤️**: Pinkish theme with heart animations
- **Fight Mode ⚡**: Dark-red theme with shaking chat bubbles
- **Sorry Mode 😢**: Blue-gray theme with sad face animation
- Custom Themes: Option to set custom colors

### Extra Features
- Date Countdown: Countdown timer for the next meetup
- Love Meter: Shows total messages exchanged
- Stickers & GIFs: Custom emojis and love stickers

## Technical Requirements
- **Frontend**: React with TypeScript, Tailwind CSS
- **Animations**: Framer Motion for smooth transitions
- **Mobile-friendly**: Responsive for both Android & iOS
- **Backend (Optional)**: Firebase Firestore for chat storage
- **Deployment**: Host frontend on Vercel

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd whatsapp-clone
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Feel free to submit issues or pull requests for improvements and features. 

## License

This project is licensed under the MIT License.