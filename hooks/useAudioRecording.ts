import { useState, useRef } from 'react';
import { Audio } from 'expo-av';

export const useAudioRecording = (recordingSettings: Audio.RecordingOptions) => {
    const [isRecording, setIsRecording] = useState(false);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const recordingRef = useRef<Audio.Recording | null>(null);

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

    const playSound = async (rate: number) => {
        if (sound) {
            await sound.setRateAsync(rate, false);
            await sound.playAsync();
        }
    };

    const stopSound = async () => {
        sound && await sound.stopAsync();
    };

    return { isRecording, sound, startRecording, stopRecording, playSound, stopSound };
};
