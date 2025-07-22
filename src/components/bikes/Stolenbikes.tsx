import { FC, useContext } from "react";
import Bikes from "./Bikes";
import { UserContext } from "../../App";
import Paginations from "../pagination/Paginations";
import "./Stolenbikes.css";

const Stolenbikes: FC = () => {
  const { newBikeData } = useContext(UserContext);
  return (
    <>
      {newBikeData.map((item: any) => {
        return (
          <Bikes
            key={item.id}
            id={item.id}
            title={item.title}
            location={item.stolen_location}
            stolenDate={item.date_stolen}
            thumb={item.thumb}
            serial={item.serial}
            frame_colors={item.frame_colors}
          />
        );
      })}
      <div className="paginations">
        <Paginations />
      </div>
    </>
  );
};

export default Stolenbikes;
