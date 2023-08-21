# Yak Bak! 90's Toy Voice mod

Yak Bak (inspired in the 90's toy) is a simple voice recording app that offers several fun voice modification types. Record your voice and play it back in different modes!

## Features

- Simple and intuitive UI.
- Multiple voice modification types.
- Adjustable playback speed.
- Audio recording with clear visual feedback.

## Installation

To set up the project locally:

1. Clone this repository:
   ```
   git clone https://github.com/Grisu-Studio/Yak-Bak
   ```
2. Install the required packages:
   ```
   npm install
   ```
3. Run the project:
   ```
   npm start
   ```
### Build Android

To be able to build the project in Android without [EAS](https://docs.expo.dev/eas/), I used these commands:

```
npx expo prebuild
npx react-native run-android --mode="release"
npx react-native build-android --mode=release
```

Remember to follow up the [React Native Documentation](https://reactnative.dev/docs/signed-apk-android) to sign the APK and publish to Google Play Store.

## Usage

1. Press the microphone icon to start recording.
2. Stop recording by pressing the stop icon.
3. Select a voice type from the list.
4. Adjust the playback speed if needed.
5. Press the play icon to hear your modified voice.

## Color Palette

- `#f9bf8f`
- `#fee9d7`
- `#e2434b`
- `#34222e`

## Built With

- [React Native](https://reactnative.dev/)
- [Expo-AV](https://docs.expo.dev/versions/latest/sdk/av/)
- [React Native Slider](https://github.com/react-native-slider/react-native-slider)
- [FontAwesome](https://fontawesome.com/)

## License

This project is licensed under the **Apache License**.
