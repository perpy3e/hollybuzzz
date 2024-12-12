import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import xmas from '../assets/xmas.mp3'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(xmas);
    audioRef.current.loop = true;

    // Retrieve saved audio state
    const savedTime = localStorage.getItem('audioCurrentTime');
    const savedVolume = localStorage.getItem('audioVolume');
    const savedMuteState = localStorage.getItem('audioMuted');

    // Set previous volume and mute state
    if (savedVolume) {
      audioRef.current.volume = parseFloat(savedVolume);
    } else {
      audioRef.current.volume = 0.5;
    }

    if (savedMuteState) {
      const muted = savedMuteState === 'true';
      audioRef.current.muted = muted;
      setIsMuted(muted);
    }

    // Restore playback position if exists
    if (savedTime) {
      audioRef.current.currentTime = parseFloat(savedTime);
    }

    // Try to play
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Autoplay was prevented:', error);
      });
    }
    setIsPlaying(true);

    // Save state before unload
    const saveAudioState = () => {
      if (audioRef.current) {
        localStorage.setItem('audioCurrentTime', audioRef.current.currentTime.toString());
        localStorage.setItem('audioVolume', audioRef.current.volume.toString());
        localStorage.setItem('audioMuted', audioRef.current.muted.toString());
      }
    };

    window.addEventListener('beforeunload', saveAudioState);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', saveAudioState);
      if (audioRef.current) {
        saveAudioState();
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuteState = !isMuted;
      audioRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
      localStorage.setItem('audioMuted', newMuteState.toString());
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white/80 rounded-full shadow-lg p-2 flex items-center space-x-2">
        {isMuted ? (
          <VolumeX 
            onClick={toggleMute} 
            className="text-red-500 cursor-pointer" 
            size={24} 
          />
        ) : (
          <Volume2 
            onClick={toggleMute} 
            className="text-green-500 cursor-pointer" 
            size={24} 
          />
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;