import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useAudioRecording } from './hooks/useAudioRecording';
import recordingSettings from './recordingSettings';
import audioTypes from './data/types';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const { isRecording, sound, startRecording, stopRecording, playSound, stopSound } = useAudioRecording(recordingSettings);

  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [selectedType, setSelectedType] = useState("Classik");
  const [selectedEffect, setSelectedEffect] = useState("classic");

  const handleCardPress = (typeName: string, effect: string) => {
    setSelectedType(typeName);
    setSelectedEffect(effect);
  };

  const renderTypeCard = ({ item }: { item: { name: string, icon: string, effect: string } }) => {
    return (
      <TouchableOpacity style={styles.typeCard} onPress={() => handleCardPress(item.name, item.effect)}>
        <Text>{item.name}</Text>
        {
          item.name == 'Skuirrel' ?
            <Octicons name="squirrel" size={24} color="#34222e" /> :
            <FontAwesome5 name={item.icon} size={24} color="#34222e" />
        }

      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Yak Bak <Text style={styles.selectedTypeText}>{selectedType}</Text></Text>
      <View style={[styles.iconContainer, { backgroundColor: '#fee9d7', borderRadius: 100 }]}>
        <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
          <FontAwesome5 name={isRecording ? "stop" : "microphone"} size={100} color="#e2434b" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.iconContainer} onPress={() => playSound(playbackRate, selectedEffect)}>
        <FontAwesome5 name="play" size={50} color="#34222e" />
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
      <StatusBar style="dark" />
    </View>
  );
}