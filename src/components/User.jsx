import React from "react";
import { useNavigate } from "react-router-dom";
import "./User.css"; // Import the CSS file

function UserCard(props) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(props.route);
  };

  return (
    <div className="w-full p-6 transition-transform transform cursor-pointer md:w-1/2 lg:w-1/3 xl:w-1/4 hover:scale-105"> {/* Adjust width for different screen sizes */}
      <div className="overflow-hidden rounded-lg shadow-md bg-amber-50 h-[500px]"> {/* Increase height */}
        <img className="object-cover w-full h-[300px]" src={props.img} alt="img" /> {/* Increase image height */}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-semibold text-center">{props.title}</h2> {/* Increase font size */}
          <p className="mb-5 text-base text-gray-700">{props.para}</p> {/* Increase font size */}
          <div className="flex justify-center">
            <button
              onClick={handleButtonClick}
              className="px-5 py-3 font-bold text-black bg-blue-400 rounded hover:bg-blue-700"
            >
              Go to {props.title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const User = () => {
  return (
    <div className="flex flex-col items-center min-h-screen gradient-background">
      <h1 className="mt-16 text-5xl font-bold text-center text-white lg:mt-0">
        Services Available
      </h1>
      <div className="flex flex-wrap justify-center gap-6 mt-50 text-black">
        <UserCard
          img="https://media.cnn.com/api/v1/images/stellar/prod/230202121817-basigo-electric-bus-nairobi-kenya-2.jpg?c=original"
          title="Buses"
          para="Need a ride around Nairobi, use our app to book and reserve a seat."
          route="/bus"
        />
        <UserCard
          img="https://nnmedia.nation.africa/uploads/2019/07/City-Market-1320x740.jpg"
          title="Stalls"
          para="Need to shop, browse through and order what you'd like."
          route="/stalls"
        />
      </div>
    </div>
  );
};

export default User;
