import React, { useState } from 'react';
import './styles/ActivityFeed';
const ActivityFeed = ({ activities }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedActivities = showAll ? activities : activities.slice(0, 5);

  return (
    <section className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Activity</h2>
      <div>
        {displayedActivities.length > 0 ? (
          displayedActivities.map((activity, index) => (
            <p key={index} className="border-b border-gray-300 py-2 text-gray-700">{activity}</p>
          ))
        ) : (
          <p className="text-gray-600">No recent activities.</p>
        )}
      </div>
      {activities.length > 5 && (
        <button 
          onClick={() => setShowAll(!showAll)} 
          className="text-[#FF6247] hover:underline mt-4"
        >
          {showAll ? 'Show less' : 'See all'}
        </button>
      )}
    </section>
  );
};

export default ActivityFeed;
