import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { musicList } from '../music/musicList';
import albumCover from '../images/yjh.jpg';
import { 
  PlayIcon, 
  PauseIcon, 
  ForwardIcon, 
  BackwardIcon 
} from '@heroicons/react/24/solid';

export default function MusicPlayer({ className = "" }) {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("自动播放失败：", error);
        setIsPlaying(false);
      });
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log("播放失败：", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentSong((prev) => (prev + 1) % musicList.length);
  };

  const playPrev = () => {
    setCurrentSong((prev) => (prev - 1 + musicList.length) % musicList.length);
  };

  const selectSong = (index) => {
    setCurrentSong(index);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  // 定义旋转动画变体
  const rotateAnimation = {
    rotate: isPlaying ? 360 : 0,
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "linear"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`${className} z-50`}
    >
      {/* 播放列表 */}
      {showPlaylist && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-4 max-h-60 overflow-y-auto"
        >
          {musicList.map((song, index) => (
            <div
              key={song.id}
              onClick={() => selectSong(index)}
              className={`p-2 hover:bg-gray-100 rounded cursor-pointer ${
                currentSong === index ? 'bg-gray-100' : ''
              }`}
            >
              <div className="text-sm font-medium">{song.title}</div>
              <div className="text-xs text-gray-500">{song.artist}</div>
            </div>
          ))}
        </motion.div>
      )}

      {/* 播放器主体 - 增大尺寸 */}
      <motion.div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-6">
          <motion.div 
            onClick={() => setShowPlaylist(!showPlaylist)}
            whileHover={{ scale: 1.05 }}
            animate={isPlaying ? rotateAnimation : { rotate: 0 }}
            className="w-24 h-24 rounded-full overflow-hidden cursor-pointer"
          >
            <img 
              src={albumCover}
              alt="专辑封面"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              {musicList[currentSong].title}
            </h3>
            <p className="text-sm text-gray-500">
              {musicList[currentSong].artist}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={playPrev}
              className="p-3 hover:bg-gray-100 rounded-full"
            >
              <BackwardIcon className="h-6 w-6 text-gray-600" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="p-3 hover:bg-gray-100 rounded-full"
            >
              {isPlaying ? (
                <PauseIcon className="h-6 w-6 text-gray-600" />
              ) : (
                <PlayIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>
            
            <button 
              onClick={playNext}
              className="p-3 hover:bg-gray-100 rounded-full"
            >
              <ForwardIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={musicList[currentSong].src}
          onEnded={playNext}
          className="hidden"
          preload="auto"
          playsInline
        />
      </motion.div>
    </motion.div>
  );
} 