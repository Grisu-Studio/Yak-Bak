import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const recordingSettings = {
    android: {
      extension: '.m4a',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: '.caf',
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(recordingSettings);
      await recording.startAsync();
      recordingRef.current = recording;
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start the recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recordingRef.current) return;

      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false, isLooping: false }
      );
      setSound(sound);
      setIsRecording(false);
    } catch (error) {
      console.error('Failed to stop the recording', error);
    }
  };

  const playSound = async () => {
    if (sound) {
      await sound.setRateAsync(playbackRate, false);
      await sound.playAsync();
    }
  };

  const stopSound = async () => {
    sound && await sound.stopAsync();
  };

  const handleCardPress = (typeName: string) => {
    console.log(`Type ${typeName} pressed.`);
  };

  const renderTypeCard = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity style={styles.typeCard} onPress={() => handleCardPress(item)}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  const typeNames = ["Type1", "Type2", "Type3"];  // Dummy data for the carousel

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Yak Bak</Text>

      <TouchableOpacity style={styles.iconContainer} onPress={isRecording ? stopRecording : startRecording}>
        <FontAwesome name="circle" size={80} color="red" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={playSound}>
        <FontAwesome name="play-circle" size={50} color="black" />
      </TouchableOpacity>

      <View style={styles.sliderContainer}>
        <Slider
          style={{ height: 40 }}
          minimumValue={0.5}
          maximumValue={2}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => setPlaybackRate(value)}
        />
        <Text style={styles.sliderLabel}>Playback Speed: {playbackRate.toFixed(2)}x</Text>
      </View>

      <FlatList
        style={styles.carousel}
        data={typeNames}
        renderItem={renderTypeCard}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    marginTop: 50,
  },
  iconContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'stretch',
    marginTop: 20,
  },
  sliderLabel: {
    textAlign: 'center',
    margin: 10,
  },
  typeCard: {
    padding: 20,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  carousel: {
    marginTop: 20,
  }
});