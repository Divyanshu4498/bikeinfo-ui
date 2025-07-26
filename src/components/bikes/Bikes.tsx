import { FC, useState } from "react";
import Image from "../../images/default_bike.png";
import "./Bikes.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const ModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface Props {
  id: number;
  title: string;
  location: string;
  stolenDate: number;
  thumb: string;
  serial: string;
  frame_colors: [];
}
const Bikes: FC<Props> = ({
  title,
  location,
  stolenDate,
  thumb,
  id,
  serial,
  frame_colors,
}) => {
  const newstolendate: any = stolenDate * 1000;
  const stolendate: string = new Date(newstolendate).toString();
  const displaysdate = stolendate.split(" ", 4).join(" ");
  const [open, setOpen] = useState(false);
  const [bikeInfo, setBikeInfo] = useState<any>();
  let reporteddate, newreporteddate;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [displayrdate, setDisplayrDate] = useState("Date Not Available");
  let color = frame_colors.join(" and ");

  const getBikeData = () => {
    axios(`https://bikeindex.org/api/v3/bikes/${id}`)
      .then((response: any) => {
        setBikeInfo(response.data.bike);
        if (response.data.bike?.stolen_record?.created_at) {
          newreporteddate = response.data.bike.stolen_record.created_at * 1000;
          reporteddate = new Date(newreporteddate).toString();
          setDisplayrDate(reporteddate.split(" ", 4).join(" "));
        }

        handleOpen();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  return (
    <div className="bike_container">
      {thumb ? (
        <img src={thumb} alt={title} />
      ) : (
        <img src={Image} alt={title} />
      )}
      <div className="bike_body">
        <p className="bike_title" onClick={getBikeData}>
          {title}
        </p>
        <div className="bike_details">
          <div>
            <p>
              <span className="bike_tag">Serial: </span>{" "}
              <span>{serial ? serial : "Unknown"}</span>
            </p>
            <p>
              <span className="bike_tag">Color: </span>{" "}
              <span>{color ? color : "Unknown"}</span>
            </p>
          </div>
          <div>
            <p>
              <span className="bike_location">
                <span className="bike_tag">Location: </span>
                {location ? (
                  <>
                    {location}
                    <LocationOnIcon fontSize="small" />
                  </>
                ) : (
                  ` Unkown`
                )}
              </span>
            </p>
            <p>
              <span className="bike_tag">Stolen Date:</span>
              <span>{displaysdate ? displaysdate : "Unknown"}</span>
            </p>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal_conatiner" sx={ModalStyle}>
          {thumb ? (
            <img className="modal_img" src={thumb} alt={title} />
          ) : (
            <img className="modal_img" src={Image} alt={title} />
          )}

          <div className="modal_title">{bikeInfo?.title}</div>
          <div className="modal_desc">
            <span>Description : </span>
            {bikeInfo?.description ? (
              <>{bikeInfo?.description}</>
            ) : (
              ` No Description Availabale`
            )}
            {bikeInfo?.description}
          </div>
          <div className="modal_date">
            <div className="modal_reported_date">
              <span>Reported : </span>
              {displayrdate}
            </div>
            <div className="modal_stolen_date">
              <span>Stolen : </span>
              {displaysdate}
            </div>
          </div>
          <div className="bike_location">
            <span>Location: </span>
            {location ? (
              <>
                {location}
                <LocationOnIcon fontSize="small" />
              </>
            ) : (
              ` Unkown`
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default Bikes;
