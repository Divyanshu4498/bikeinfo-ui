import { Button } from "@mui/material";
import { FC, useState, useContext } from "react";
import "./Filter.css";
import { UserContext } from "../../App";

const Filter: FC = () => {
  const { bikeData, setNewBikeData, setShowNoData } = useContext(UserContext);
  const [searchTitle, setSearchTitle] = useState("");
  const [fromDate, setFromDate] = useState<any>("");
  const [toDate, setToDate] = useState<any>("");
  const fliterenable =
    searchTitle.length === 0 && (fromDate.length === 0 || toDate.length === 0);
  const handleSearchTitle = () => {
    setNewBikeData(bikeData);
    setShowNoData(true);
    let newfromdate = Date.parse(fromDate);
    let newtodate = Date.parse(toDate);
    const filterbikedata = bikeData.filter((e: any) => {
      if (searchTitle && newfromdate && newtodate) {
        return (
          e.title.includes(searchTitle) &&
          e.date_stolen * 1000 >= newfromdate &&
          e.date_stolen * 1000 <= newtodate
        );
      } else if (!searchTitle && newfromdate && newtodate) {
        return (
          e.date_stolen * 1000 >= newfromdate &&
          e.date_stolen * 1000 <= newtodate
        );
      } else if (!newfromdate && !newtodate && searchTitle) {
        return e.title.includes(searchTitle);
      } else {
        return bikeData;
      }
    });

    setNewBikeData(filterbikedata);

    setSearchTitle("");
    setFromDate("");
    setToDate("");
  };
  return (
    <form className="filter">
      <div className="filter_heading">
        <h3>Filters</h3>
      </div>
      <div className="filter_container">
        <div className="filter_title">
          <label>Filter By Title :</label>
          <input
            type="text"
            placeholder="Enter Title"
            value={searchTitle || ""}
            onChange={(e) => setSearchTitle(e.target.value)}
            required
          />
        </div>
        <div className="filter_date">
          <label>Filter By Date :</label>
          <div className="filter_date_container">
            <div className="from_date">
              <label>From</label>
              <input
                type="date"
                onChange={(e) => setFromDate(e.target.value)}
                value={fromDate || ""}
                required
              />
            </div>
            <div className="to_date">
              <label>To</label>
              <input
                type="date"
                onChange={(e) => setToDate(e.target.value)}
                value={toDate || ""}
                required
              />
            </div>
          </div>
        </div>
        <div className="filter_submit">
          <Button
            size="medium"
            variant="outlined"
            onClick={handleSearchTitle}
            disabled={fliterenable}
          >
            Filter
          </Button>
        </div>
      </div>
    </form>
  );
};
export default Filter;
