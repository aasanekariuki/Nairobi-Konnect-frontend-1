import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AdminActivity = () => {
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [visibleCount, setVisibleCount] = useState(5);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { id: 1, user: "John Doe", action: "Created a new post", time: "2 mins ago" },
        { id: 2, user: "Jane Smith", action: "Updated profile picture", time: "10 mins ago" },
        { id: 3, user: "Alice Johnson", action: "Commented on a post", time: "30 mins ago" },
        { id: 4, user: "Bob Brown", action: "Liked a comment", time: "45 mins ago" },
        { id: 5, user: "Clara Davis", action: "Changed password", time: "1 hour ago" },
        { id: 6, user: "David Wilson", action: "Shared a post", time: "2 hours ago" },
        { id: 7, user: "Eva Thompson", action: "Deleted a post", time: "3 hours ago" },
        { id: 8, user: "Frankie Green", action: "Updated account settings", time: "4 hours ago" },
        { id: 9, user: "George Harris", action: "Followed a new user", time: "5 hours ago" },
        { id: 10, user: "Hannah Adams", action: "Posted a comment", time: "6 hours ago" },
        { id: 11, user: "Ivy Baker", action: "Unliked a post", time: "7 hours ago" },
        { id: 12, user: "Jack White", action: "Uploaded a photo", time: "8 hours ago" },
        { id: 13, user: "Kylie Black", action: "Joined a group", time: "9 hours ago" },
        { id: 14, user: "Liam Scott", action: "Reported a post", time: "10 hours ago" },
        { id: 15, user: "Mia Lee", action: "Changed email address", time: "11 hours ago" },
        { id: 16, user: "Noah Brown", action: "Created an event", time: "12 hours ago" },
        { id: 17, user: "Olivia White", action: "Commented on a photo", time: "13 hours ago" },
        { id: 18, user: "Paul Green", action: "Joined a discussion", time: "14 hours ago" },
        { id: 19, user: "Quinn Black", action: "Updated bio", time: "15 hours ago" },
        { id: 20, user: "Riley Blue", action: "Liked a post", time: "16 hours ago" },
        { id: 21, user: "Sophia Adams", action: "Shared a video", time: "17 hours ago" },
        { id: 22, user: "Tyler Johnson", action: "Changed profile picture", time: "18 hours ago" },
        { id: 23, user: "Uma Patel", action: "Reported a user", time: "19 hours ago" },
        { id: 24, user: "Victor Lee", action: "Posted a review", time: "20 hours ago" },
        { id: 25, user: "Wendy Martinez", action: "Participated in a poll", time: "21 hours ago" },
        
      ];
      setActivities(data);
    };

    fetchData();
  }, []);

  const filteredActivities = activities
    .filter((activity) =>
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));

  const visibleActivities = filteredActivities.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Load 5 more activities
  };

  return (
    <div className="admin-activity p-6 min-h-screen" style={{ backgroundColor: "var(--primary-color)" }}>
      <div className="header mb-8">
        <h2 className="text-3xl font-bold text-white">Admin Activity Logs</h2>
        <p className="text-gray-300">Monitor the latest activities in the application.</p>
      </div>

      <div className="controls mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by user or action..."
          className="border border-gray-300 rounded py-2 px-4 w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by Time: {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      <div className="activity-feed">
        {visibleActivities.length === 0 ? (
          <p className="text-gray-300">No activities found.</p>
        ) : (
          visibleActivities.map((activity) => (
            <div key={activity.id} className="activity-item relative mb-8 pl-10">
              <div className="absolute left-0 top-2 w-8 h-8 bg-blue-800 text-white flex items-center justify-center rounded-full shadow-md">
                {activity.user[0]}
              </div>
              <div className="activity-details bg-white p-6 rounded shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-gray-900">
                  <span className="font-bold">{activity.user}</span> {activity.action}
                </p>
                <p className="text-gray-500 text-sm">{activity.time}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between mt-6">
        {visibleActivities.length < filteredActivities.length && (
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={loadMore}>
            Load More
          </button>
        )}

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => navigate("/admin")} // Navigate to AdminDashboard
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AdminActivity;