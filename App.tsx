import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { useAudioRecording } from './hooks/useAudioRecording';
import recordingSettings from './recordingSettings';
import audioTypes from './data/types';

export default function App() {
  const { isRecording, sound, startRecording, stopRecording, playSound, stopSound } = useAudioRecording(recordingSettings);

  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [selectedType, setSelectedType] = useState("Classik");

  const handleCardPress = (typeName: string) => {
    setSelectedType(typeName);
  };

  const renderTypeCard = ({ item }: { item: { name: string, icon: string } }) => {
    return (
      <TouchableOpacity style={styles.typeCard} onPress={() => handleCardPress(item.name)}>
        <Text>{item.name}</Text>
        <FontAwesome name={item.icon} size={24} color="#34222e" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Yak Bak {selectedType}</Text>
      <View style={[styles.iconContainer, { backgroundColor: '#fee9d7', borderRadius: 100 }]}>
        <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
          <FontAwesome name={isRecording ? "stop" : "microphone"} size={100} color="#e2434b" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.iconContainer} onPress={() => playSound(playbackRate)}>
        <FontAwesome name="play" size={50} color="#34222e" />
      </TouchableOpacity>

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Playback Speed: {playbackRate.toFixed(2)}x</Text>
        <Slider
          style={{ height: 40 }}
          minimumValue={0.5}
          maximumValue={2}
          minimumTrackTintColor="#3e3636"
          maximumTrackTintColor="#34222e"
          thumbTintColor='#e2434b'
          onValueChange={(value) => setPlaybackRate(value)}
        />
      </View>

      <Text style={styles.cardLabel}>Warp it! </Text>
      <FlatList
        style={styles.carousel}
        data={audioTypes}
        renderItem={renderTypeCard}
        horizontal={false}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}