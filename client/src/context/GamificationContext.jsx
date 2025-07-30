import { createContext, useState, useEffect } from 'react';
// import axios from '../utils/api'; // 🔒 Uncomment when backend is ready

export const GamificationContext = createContext();

export const GamificationProvider = ({ children }) => {
  const [badges, setBadges] = useState([]);
  const [progress, setProgress] = useState(0); // 0-100
  const [level, setLevel] = useState(1);

  // 🔁 Simulated fetch from backend (commented)
  const fetchGamificationData = async () => {
    try {
      // const res = await axios.get('/gamification/me');
      // setBadges(res.data.badges);
      // setProgress(res.data.progress);
      // setLevel(res.data.level);
    } catch (err) {
      console.error('Failed to load gamification data');
    }
  };

  useEffect(() => {
    fetchGamificationData();
  }, []);

  // ✅ Add badge
  const addBadge = (badgeName) => {
    setBadges((prev) => [...prev, badgeName]);

    // 🔒 Future API call:
    // await axios.post('/gamification/add-badge', { badge: badgeName });
  };

  // ✅ Update progress (0-100), and auto-increase level
  const updateProgress = (value) => {
    const newProgress = Math.min(progress + value, 100);
    setProgress(newProgress);

    if (newProgress >= 100) {
      levelUp();
    }

    // 🔒 Future API:
    // await axios.post('/gamification/progress', { value });
  };

  // ✅ Increase level and reset progress
  const levelUp = () => {
    setLevel((prev) => prev + 1);
    setProgress(0);

    // 🔒 Future API:
    // await axios.post('/gamification/level-up');
  };

  return (
    <GamificationContext.Provider
      value={{
        badges,
        progress,
        level,
        addBadge,
        updateProgress,
        levelUp,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};
