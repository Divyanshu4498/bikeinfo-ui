import { FC, useContext, useState } from "react";
import { UserContext } from "../../App";
import { AppContextInterface } from "../../Interface";
import "./Paginations.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";

const Paginations: FC = () => {
  const { totalCount, apiDataParam, setBikeData, setNewBikeData } = useContext<
    AppContextInterface | any
  >(UserContext);
  const [page, setPage] = useState(1);
  const handlePageClick = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const getpaginationData = () => {
      const paginationparam = {
        ...apiDataParam,
        page: value,
      };
      axios("https://bikeindex.org/api/v3/search", { params: paginationparam })
        .then((response: any) => {
          setBikeData(response.data.bikes);
          setNewBikeData(response.data.bikes);
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    getpaginationData();
    setPage(value);
  };

  return (
    <div className="pagination_container">
      <Stack spacing={2}>
        <Pagination
          count={totalCount ? Math.ceil(totalCount / 10) : 1}
          page={page}
          onChange={handlePageClick}
        />
      </Stack>
    </div>
  );
};

export default Paginations;
