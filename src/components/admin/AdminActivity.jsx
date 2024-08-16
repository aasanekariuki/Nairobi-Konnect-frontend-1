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
      // New data
      const data = [
        { id: 1, name: "Wanjiru Mwangi", email: "wanjiru@example.com", role: "Driver", activity: ["Booked a bus ticket", "Updated profile", "Viewed routes"] },
        { id: 2, name: "Juma Abdi", email: "juma@example.com", role: "Passenger", activity: ["Signed up", "Booked a bus ticket", "Posted a review"] },
        { id: 3, name: "Achieng' Otieno", email: "achieng@example.com", role: "Driver", activity: ["Completed a trip", "Earned a bonus", "Requested time off"] },
        { id: 4, name: "Karanja Njeri", email: "karanja@example.com", role: "Passenger", activity: ["Canceled a trip", "Reported an issue"] },
        { id: 5, name: "Kamau Ndungu", email: "kamau@example.com", role: "Driver", activity: ["Accepted a trip", "Rated a passenger"] },
        { id: 6, name: "Chebet Kiptoo", email: "chebet@example.com", role: "Passenger", activity: ["Wrote a review", "Referred a friend"] },
        { id: 7, name: "Muthoni Wairimu", email: "muthoni@example.com", role: "Driver", activity: ["Viewed routes", "Updated vehicle details"] },
        { id: 8, name: "Ochieng' Onyango", email: "ochieng@example.com", role: "Passenger", activity: ["Booked a return ticket", "Provided feedback"] },
        { id: 9, name: "Njeri Karanja", email: "njeri@example.com", role: "Driver", activity: ["Completed a trip", "Earned a bonus"] },
        { id: 10, name: "Abdi Mohamed", email: "abdi@example.com", role: "Passenger", activity: ["Joined a group", "Posted a review"] },
        { id: 11, name: "Wambui Njeri", email: "wambui@example.com", role: "Driver", activity: ["Updated profile", "Rated a passenger"] },
        { id: 12, name: "Kiptoo Chepkwony", email: "kiptoo@example.com", role: "Passenger", activity: ["Booked a bus ticket", "Changed preferences"] },
        { id: 13, name: "Akinyi Nyabera", email: "akinyi@example.com", role: "Driver", activity: ["Completed a trip", "Earned a badge"] },
        { id: 14, name: "Mugo Kamau", email: "mugo@example.com", role: "Passenger", activity: ["Reported an issue", "Joined a group"] },
        { id: 15, name: "Adhiambo Akinyi", email: "adhiambo@example.com", role: "Driver", activity: ["Viewed routes", "Updated vehicle details"] },
      ];
      // Transform the data to match the required format
      const transformedData = data.flatMap(user => 
        user.activity.map(action => ({
          id: user.id,
          user: user.name,
          action,
          time: "N/A" // Add a placeholder for time or calculate if needed
        }))
      );
      setActivities(transformedData);
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
        <h2 className="text-3xl font-bold text-black">Admin Activity Logs</h2>
        <p className="text-black">Monitor the latest activities in the application.</p>
      </div>

      <div className="controls mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by user or action..."
          className="border border-gray-300 rounded py-2 px-4 w-1/3 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-teal-500 text-black py-2 px-4 rounded hover:bg-teal-600"
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
