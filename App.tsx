import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { useAudioRecording } from './hooks/useAudioRecording';
import recordingSettings from './recordingSettings';

export default function App() {
  const { isRecording, sound, startRecording, stopRecording, playSound, stopSound } = useAudioRecording(recordingSettings);

  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [selectedType, setSelectedType] = useState("Classik");

  const handleCardPress = (typeName: string) => {
    setSelectedType(typeName);
  };

  const renderTypeCard = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity style={styles.typeCard} onPress={() => handleCardPress(item)}>
        <Text>{item}</Text>
        <FontAwesome name="arrow-right" size={24} color="#000" />
      </TouchableOpacity>
    );
  };

  const typeNames = ["Classik", "Bakwards", "Ekko", "Skuirrel", "Dark Vader", "Robotik"];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Yak Bak {selectedType}</Text>
      <View style={[styles.iconContainer, { backgroundColor: '#f0f0f0', borderRadius: 100 }]}>
        <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
          <FontAwesome name={isRecording ? "stop" : "microphone"} size={100} color="#d72323" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.iconContainer} onPress={() => playSound(playbackRate)}>
        <FontAwesome name="play" size={50} color="#000000" />
      </TouchableOpacity>

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Playback Speed: {playbackRate.toFixed(2)}x</Text>
        <Slider
          style={{ height: 40 }}
          minimumValue={0.5}
          maximumValue={2}
          minimumTrackTintColor="#3e3636"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => setPlaybackRate(value)}
        />
      </View>

      <FlatList
        style={styles.carousel}
        data={typeNames}
        renderItem={renderTypeCard}
        horizontal={false}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}