import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CarsTable from "../../components/Table/Table";
import Header from "../../components/Header/Header";

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const LogOutHandler = () => {
    localStorage.clear("token");
    navigate("/");
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/car/?token=${token}`
        );
        if (res.status === 200) {
          setData(res.data.data);
        }
      } catch (err) {
        console.log("errr", err.message);
      }
    };
    getData();
  });

  return (
    <>
      <Header LogOutHandler={LogOutHandler} />
      <CarsTable data={data} />
    </>
  );
};
