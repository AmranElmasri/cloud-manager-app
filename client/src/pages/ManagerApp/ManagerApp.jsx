import axios from "axios";
import React, { useState } from "react";
import "./style.css";
import { useSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";

const ManagerConfig = () => {
  const [resize, setResize] = useState("manual");
  const [resizeValue, setResizeValue] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [runningIns, setRunning] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const setResizeMemCache = (e) => {
    setResize(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (resize === "manual") {
        const { data } = await axios.post("/api/v1/manager-resize", {
          resizeValue,
        });
        enqueueSnackbar(data.message, { variant: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const increaseInstance = async (e) => {
    try {
      setLoading1(true);
      const { data } = await axios.post("/api/v1/manager-resize", {resizeValue: "increase"});
      setRunning(data.data)
      enqueueSnackbar(data.message, { variant: "success" });
      setLoading1(false);
    } catch (error) {
      setLoading1(false);
      console.log(error);
    }
  };
  const decreaseInstance = async (e) => {
    try {
      setLoading2(true);
      const { data } = await axios.post("/api/v1/manager-resize", {resizeValue: "decrease"});
      setRunning(data.data)
      enqueueSnackbar(data.message, { variant: "success" });
      setLoading2(false);
    } catch (error) {
      setLoading2(false);
      console.log(error);
    }
  };

  return (
    <div className="ManagerConfig">
      <p>Configure The mem-cache</p>
      <form onSubmit={handleSubmit}>
        <div className="config__content">
          <select name="cachConfig" id="">
            <option value="10mb">10 mb</option>
            <option value="20mb">20 mb</option>
            <option value="30mb">30 mb</option>
            <option value="40mb">40 mb</option>
            <option value="50mb">50 mb</option>
            <option value="60mb">60 mb</option>
            <option value="70mb">70 mb</option>
            <option value="80mb">80 mb</option>
            <option value="90mb">90 mb</option>
            <option value="100mb">100 mb</option>
          </select>
          <p>Configure The mem-cache</p>
          <select name="replacePolicy">
            <option value="least recently used">least recently used</option>
            <option value="random">Random</option>
          </select>
          <div style={{ margin: "20px 0" }}>
            <label>
              <p style={{ display: "inline-block" }}>delete all images</p>
              <input type="checkbox" name="clearImages" />
            </label>
          </div>
          <div style={{ margin: "20px 0" }}>
            <label>
              <p style={{ display: "inline-block" }}>
                clear all mem-cache nodes in the pool
              </p>
              <input type="checkbox" name="clearMemecache" />
            </label>
          </div>
          <div>
            <p>current instances/cache are running is {runningIns ? runningIns: 1}</p>
            <p style={{ display: "inline-block" }}>
              Selecting between (Manual mode-Automatically mode) for resizing
              the mem-cache
            </p>
            <select
              name="resizeMemCahe"
              onClick={setResizeMemCache}
              style={{ fontSize: "18px" }}
            >
              <option value="manual">Manual</option>
              <option value="auto">Automatic</option>
            </select>
            {/* <div style={{ fontSize: "20px" }}>
              {resize === "manual" && (
                <input
                  type="number"
                  name="resizeMemCahe"
                  max={8}
                  min={1}
                  style={{ width: "100px" }}
                  onChange={(e) => setResizeValue(e.target.value)}
                />
              )}
            </div> */}
          </div>
          {resize === "manual" && (
            <div style={{ fontSize: "20px", marginTop: "20px" }}>
              <LoadingButton
                variant="contained"
                onClick={increaseInstance}
                size="small"
                loading={loading1}
              >
                increase instance
              </LoadingButton>
              <p style={{margin: '10px', fontSize: "18px"}}>num of instances {runningIns ? runningIns: 1} </p>
              <LoadingButton
                variant="contained"
                onClick={decreaseInstance}
                size="small"
                loading={loading2}
              >
                decrease instance
              </LoadingButton>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ManagerConfig;
