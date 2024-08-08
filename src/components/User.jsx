import React from "react";
import { useNavigate } from "react-router-dom";
import "./User.css"; 

function UserCard(props) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(props.route);
  };

  return (
    <div className="w-full sm:w-80 md:w-96 lg:w-[350px] xl:w-[400px] p-4 transition-transform transform cursor-pointer hover:scale-105">
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-white h-[500px] flex flex-col">
        <img className="object-cover w-full h-60" src={props.img} alt="img" />
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-black">{props.title}</h2>
            <p className="text-sm text-black mb-4">{props.para}</p>
          </div>
          <button
            onClick={handleButtonClick}
            className="self-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            Go to {props.title}
          </button>
        </div>
      </div>
    </div>
  );
}

const User = () => {
  return (
    <div className="flex flex-col items-center min-h-screen gradient-background p-6">
      <h1 className="text-5xl font-bold text-center text-white mb-12">
        Services Available
      </h1>
      <div className="flex flex-wrap justify-center gap-12">
        <UserCard
          img="https://media.cnn.com/api/v1/images/stellar/prod/230202121817-basigo-electric-bus-nairobi-kenya-2.jpg?c=original"
          title="Buses"
          para="Need a ride around Nairobi? Use our app to book and reserve a seat."
          route="/bus"
        />
        <UserCard
          img="https://nnmedia.nation.africa/uploads/2019/07/City-Market-1320x740.jpg"
          title="Stalls"
          para="Need to shop? Browse through and order what you'd like."
          route="/stalls"
        />
      </div>
    </div>
  );
};

export default User;
