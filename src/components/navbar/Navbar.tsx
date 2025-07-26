import { FC, useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { UserContext } from "../../App";
import LogoImg from "../../images/bike_logo.png";
import "./Navbar.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { ModalStyle } from "../bikes/Bikes";

const Navbar: FC = () => {
  const [location, setLocation] = useState("");
  const [miles, setMiles] = useState("200");
  const enabled = location.length === 0 || miles.length === 0;
  const [reportOpen, setReportOpen] = useState(false);
  const [getReportOpen, setGetReportOpen] = useState(false);
  const [formData, setFormData] = useState({
    bikeId: "",
    ownerName: "",
    dateStolen: "",
    description: "",
  });
  const [reportData, setReportData] = useState<any[]>([]);

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

  const handleReportOpen = () => setReportOpen(true);
  const handleReportClose = () => setReportOpen(false);

  const handleGetReportOpen = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/records/fetch");
      setReportData(res.data);
      setGetReportOpen(true);
    } catch (err) {
      alert("Failed to fetch reports");
    }
  };
  const handleGetReportClose = () => setGetReportOpen(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/records/submit", formData);
      alert("Report submitted!");
      setReportOpen(false);
      setFormData({
        bikeId: "",
        ownerName: "",
        dateStolen: "",
        description: "",
      });
    } catch (err) {
      alert("Failed to submit report");
    }
  };

  return (
    <div className="navbar">
      <div className="nav_container">
        <div className="navbar_logo">
          <img src={LogoImg} className="bikeLogo" alt="" />
          <span className="logo_up">Bike</span>
          <span className="logo_down">info</span>
          <Button size="small" variant="contained" onClick={handleReportOpen}>
            Report
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={handleGetReportOpen}
          >
            Get Report
          </Button>
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
      {/* Report Modal */}
      <Modal open={reportOpen} onClose={handleReportClose}>
        <Box className="modal_conatiner" sx={ModalStyle}>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Bike ID"
              name="bikeId"
              value={formData.bikeId}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Owner Name"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Date Stolen"
              name="dateStolen"
              value={formData.dateStolen}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              required
              placeholder="DD/MM/YYYY"
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      {/* Get Report Modal */}
      <Modal open={getReportOpen} onClose={handleGetReportClose}>
        <Box className="modal_conatiner" sx={ModalStyle}>
          <h2>Reported Stolen Bikes</h2>
          {reportData.length ? (
            reportData.map((item) => (
              <Box
                key={item._id}
                sx={{ mb: 2, p: 1, border: "1px solid #ccc", borderRadius: 2 }}
              >
                <div>Bike ID: {item.bikeId}</div>
                <div>Owner Name: {item.ownerName}</div>
                <div>Date Stolen: {item.dateStolen}</div>
                <div>Description: {item.description}</div>
              </Box>
            ))
          ) : (
            <div>No reports found.</div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Navbar;
