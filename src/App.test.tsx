import { render, waitFor, screen } from "@testing-library/react";
import App from "./App";
import axios from "axios";
require("@testing-library/jest-dom");

// jest.mock("axios");

// const dummyTodos: any = [
//   {
//     date_stolen: 1665151646,
//     description: "29 inch tires mirror and custome handle bars added",
//     frame_colors: ["Silver, gray or bare metal"],
//     frame_model: "Canvas neo remixite 2",
//     id: 1411760,
//     is_stock_img: false,
//     large_img: null,
//     location_found: null,
//     manufacturer_name: "Cannondale",
//     external_id: null,
//     registry_name: null,
//     registry_url: null,
//     serial: "cm20a000243",
//     status: "stolen",
//     stolen: true,
//     stolen_coordinates: null,
//     stolen_location: "US",
//     thumb: null,
//     title: "2019 Cannondale Canvas neo remixite 2",
//     url: "https://bikeindex.org/bikes/1411760",
//     year: 2019,
//   },
// ];

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Bike/i);
  expect(linkElement).toBeInTheDocument();
});

// test("todos list", async () => {
//   (axios.get as jest.Mock).mockResolvedValue({ data: dummyTodos });
//   render(<App />);
//   const todoList = await waitFor(() => screen.findAllByTestId("todo"));
//   expect(todoList).toHaveLength(1);
// });
