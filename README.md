# StapuBox

A modern React Native application for browsing sports tournaments and matches with a beautiful, responsive UI.

## Features

- Browse sports tournaments and matches
- Filter by sport type
- View match details and schedules
- Smooth animations and transitions
- Offline support with intelligent caching
- Image lazy loading with skeleton placeholders

## Demo

Check out the app demo here: [Watch Demo](https://drive.google.com/file/d/1cI6RaM0_0lUet70heYIOgOwB_ZSvvUlt/view?usp=sharing)

## Tech Stack

- React Native
- TypeScript
- Expo
- React Native Elements
- React Native Calendars
- Expo Image
- Expo Vector Icons

## Setup

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/alandouglasdan/StapuBox.git
   cd StapuBox
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

## Run Steps

### Development
```bash
# Start the development server
npx expo start

# For iOS (requires Xcode)
npx expo run:ios

# For Android (requires Android Studio)
npx expo run:android
```

### Production Build
```bash
# Build for Android
eas build -p android --profile preview

# Build for iOS
eas build -p ios --profile preview
```

## Key Decisions

1. **State Management**: Used React's built-in state management for simplicity and performance.

2. **Offline Support**: Implemented AsyncStorage for caching API responses to ensure smooth offline experience.

3. **Image Loading**: Utilized Expo Image with skeleton placeholders for optimal image loading performance and better UX.

4. **Responsive Design**: Implemented flexbox-based layouts that work across different screen sizes.

5. **Performance**: Added memoization and proper component structure to ensure smooth animations and transitions.

6. **Type Safety**: Used TypeScript throughout the project for better developer experience and code reliability.

3. Start the development server
   ```bash
   npx expo start
   ```

## Building for Production

### Android
```bash
eas build -p android --profile preview
```

### iOS
```bash
eas build -p ios --profile preview
```

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Alan Douglas - [@linkedIn](https://www.linkedin.com/in/alandouglasdan/)

Project Link: [https://github.com/alandouglasdan/StapuBox](https://github.com/alandouglasdan/StapuBox)
