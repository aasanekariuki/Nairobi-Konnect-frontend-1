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
        { id: 1, user: "Wanjiru Mwangi", action: "Booked a bus ticket", time: "2 mins ago" },
        { id: 2, user: "Juma Abdi", action: "Added a new stall", time: "10 mins ago" },
        { id: 3, user: "Achieng' Otieno", action: "Updated bus schedule", time: "30 mins ago" },
        { id: 4, user: "Karanja Njeri", action: "Canceled a bus ticket", time: "45 mins ago" },
        { id: 5, user: "Kamau Ndungu", action: "Changed stall location", time: "1 hour ago" },
        { id: 6, user: "Chebet Kiptoo", action: "Shared bus route details", time: "2 hours ago" },
        { id: 7, user: "Muthoni Wairimu", action: "Deleted a bus booking", time: "3 hours ago" },
        { id: 8, user: "Ochieng' Onyango", action: "Updated account settings", time: "4 hours ago" },
        { id: 9, user: "Njeri Karanja", action: "Followed a new bus service", time: "5 hours ago" },
        { id: 10, user: "Abdi Mohamed", action: "Posted a review for a bus service", time: "6 hours ago" },
        { id: 11, user: "Wambui Njeri", action: "Unliked a bus service", time: "7 hours ago" },
        { id: 12, user: "Kiptoo Chepkwony", action: "Uploaded a photo of the stall", time: "8 hours ago" },
        { id: 13, user: "Akinyi Nyabera", action: "Joined a bus booking group", time: "9 hours ago" },
        { id: 14, user: "Mugo Kamau", action: "Reported a bus service issue", time: "10 hours ago" },
        { id: 15, user: "Adhiambo Akinyi", action: "Changed stall operating hours", time: "11 hours ago" },
        { id: 16, user: "Omondi Ochieng'", action: "Created a new bus route", time: "12 hours ago" },
        { id: 17, user: "Wangari Maathai", action: "Commented on a bus service", time: "13 hours ago" },
        { id: 18, user: "Mutiso Mwenda", action: "Joined a discussion about bus fares", time: "14 hours ago" },
        { id: 19, user: "Ngunyi Mwangi", action: "Updated bus fare prices", time: "15 hours ago" },
        { id: 20, user: "Wanjiku Mbugua", action: "Liked a post about bus safety", time: "16 hours ago" },
        { id: 21, user: "Kihara Njoroge", action: "Shared a video about bus routes", time: "17 hours ago" },
        { id: 22, user: "Wairimu Mwangi", action: "Changed stall branding", time: "18 hours ago" },
        { id: 23, user: "Otieno Ouma", action: "Reported a user for spam", time: "19 hours ago" },
        { id: 24, user: "Auma Onyango", action: "Posted a review for a stall", time: "20 hours ago" },
        { id: 25, user: "Atieno Odhiambo", action: "Participated in a poll about bus services", time: "21 hours ago" },
        
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