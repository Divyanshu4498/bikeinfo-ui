import { FC, useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { UserContext } from "../../App";
import LogoImg from "../../images/bike_logo.png";
import "./Navbar.css";

const Navbar: FC = () => {
  const [location, setLocation] = useState("");
  const [miles, setMiles] = useState("200");
  const enabled = location.length === 0 || miles.length === 0;

  const {
    apiDataParam,
    setApiDataParam,
    apiCountParam,
    setApiCountParam,
    setInputLocation,
    setInputMiles,
    setShowCount,
    setShowNoData,
  } = useContext(UserContext);

  const handleSearch = () => {
    setShowNoData(false);
    if (Number(miles) <= 0) {
      alert("Please Enter Miles Value Greater than 0");
    } else {
      setInputMiles(miles);
      setInputLocation(location);

      setApiDataParam({
        ...apiDataParam,
        location: location,
        distance: miles,
      });
      setApiCountParam({
        ...apiCountParam,
        location: location,
        distance: miles,
      });
      setLocation("");
      setShowCount(true);
    }
  };

  return (
    <div className="navbar">
      <div className="nav_container">
        <div className="navbar_logo">
          <img src={LogoImg} className="bikeLogo" alt="" />
          <span className="logo_up">Bike</span>
          <span className="logo_down">info</span>
        </div>
        <form className="navbar_search">
          <label>Search within</label>
          <input
            className="input_within"
            type="number"
            value={miles}
            onChange={(e) => setMiles(e.target.value)}
            min="1"
          />
          <label>miles of</label>
          <input
            className="input_location"
            placeholder="Enter location"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
          <Button
            size="small"
            variant="contained"
            onClick={handleSearch}
            disabled={enabled}
          >
            <SearchIcon />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
