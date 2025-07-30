import React, { useEffect, useState, useContext, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const BASE_URL = 'http://localhost:5000'; // ✅ change this to your backend URL if hosted

const RewardStore = () => {
  const [userCoins, setUserCoins] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  const fetchData = useCallback(async () => {
    try {
      // ✅ Fetch all rewards
      const rewardRes = await axios.get(`${BASE_URL}/api/rewards`);
      setRewards(rewardRes.data.rewards);

      // ✅ Fetch user coins
      if (user && user._id) {
        const userRes = await axios.get(`${BASE_URL}/api/user/${user._id}`);
       const userData = userRes.data;

        if (userData && typeof userData.coins === 'number') {
          console.log('✅ User data:', userData);
          setUserCoins(userData.coins);
        } else {
          console.warn('⚠️ Coins not found in user data:', userRes.data);
          setUserCoins(0);
        }
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchData();
  }, [user, fetchData]);

  const handleClaim = async (reward) => {
    if (!user || !user._id) {
      alert('You must be logged in to claim rewards.');
      return;
    }

    if (userCoins < reward.cost) {
      alert(`Not enough coins to claim ${reward.title}`);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/rewards/claim', {
        userId: user._id,
        rewardId: reward._id,
      });

      alert(res.data.message);
      setUserCoins(res.data.coinsRemaining);
    } catch (err) {
      console.error('Error claiming reward:', err);
      alert('Failed to claim reward');
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">🎁 Reward Store</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading rewards...</p>
        ) : (
          <>
            <div className="mb-6 text-center text-lg">
              <span className="font-semibold">Your Coins:</span>{' '}
              <span className="text-green-600 font-bold text-xl">🪙 {userCoins}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {rewards && rewards.length > 0 ? (
                rewards.map((reward) => (
                  <div key={reward._id} className="bg-white p-6 shadow rounded">
                    <h2 className="text-xl font-semibold mb-2">{reward.title}</h2>
                    <p className="mb-4">Cost: 🪙 {reward.cost}</p>
                    <button
                      onClick={() => handleClaim(reward)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
                      disabled={userCoins < reward.cost}
                    >
                      {userCoins < reward.cost ? 'Not Enough Coins' : 'Claim Reward'}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full">No rewards available.</p>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default RewardStore;
