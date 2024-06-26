import React, { useEffect } from "react";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import { Box, Typography, createTheme } from "@mui/material";
import styles from "../style/Profile.module.css";
import { ThemeProvider } from "@emotion/react";
import axios from "axios";

function valuetext(value) {
  return `${value}°C`;
}

const finalTheme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        valueLabel: ({ ownerState, theme }) => ({
          ...(ownerState.orientation === "vertical" && {
            backgroundColor: "transparent",
            color: theme.palette.grey[500],
          }),
        }),
        markLabel: {
          color: "white",
        },
      },
    },
  },
});

const marks = [
  {
    value: 0,
    label: "24:00",
  },
  {
    value: 1,
    label: "23:00",
  },
  {
    value: 2,
    label: "22:00",
  },
  {
    value: 3,
    label: "21:00",
  },
  {
    value: 4,
    label: "20:00",
  },
  {
    value: 0,
    label: "24:00",
  },
  {
    value: 1,
    label: "23:00",
  },
  {
    value: 2,
    label: "22:00",
  },
  {
    value: 3,
    label: "21:00",
  },
  {
    value: 4,
    label: "20:00",
  },
  {
    value: 5,
    label: "19:00",
  },
  {
    value: 6,
    label: "18:00",
  },
  {
    value: 7,
    label: "17:00",
  },
  {
    value: 8,
    label: "16:00",
  },
  {
    value: 9,
    label: "15:00",
  },
  {
    value: 10,
    label: "14:00",
  },
  {
    value: 11,
    label: "13:00",
  },
  {
    value: 12,
    label: "12:00",
  },
  {
    value: 13,
    label: "11:00",
  },
  {
    value: 14,
    label: "10:00",
  },
  {
    value: 15,
    label: "9:00",
  },
  {
    value: 16,
    label: "8:00",
  },
  {
    value: 17,
    label: "7:00",
  },
  {
    value: 18,
    label: "6:00",
  },
  {
    value: 19,
    label: "5:00",
  },
  {
    value: 20,
    label: "4:00",
  },
  {
    value: 21,
    label: "3:00",
  },
  {
    value: 22,
    label: "2:00",
  },
  {
    value: 23,
    label: "1:00",
  },
  {
    value: 24,
    label: "0:00",
  },
];

function Profile({ user }) {
  const [value, setValue] = useState([10, 12]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_BASE_URL + "/auth/getday", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setValue([24 - response.data.dayEnd, 24 - response.data.dayStart]);
        // setEnd(response.data.dayEnd);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    console.log(newValue);

    axios
      .put(process.env.REACT_APP_BACKEND_BASE_URL + "/auth/editday", {
        dayStart: 24 - newValue[1],
        dayEnd: 24 - newValue[0],
        UserId: user.id,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      }
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  console.log(value);

  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  function reset() {
      axios.delete(process.env.REACT_APP_BACKEND_BASE_URL + "/auth/delete",
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      }
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1
        style={{
          backgroundColor: "inherit",
          color: "white",
          marginBottom: "100px",
        }}
      >
        {user.username}
      </h1>
      <ThemeProvider theme={finalTheme}>
        <Box
          sx={{
            height: 800,
            marginTop: "200px",
            border: "2px solid #4c525d",
            width: "40%",
            margin: "auto",
            padding: "20px",
            marginBottom: "100px",
          }}
        >
          <Typography
            id="non-linear-slider"
            gutterBottom
            sx={{ marginBottom: "50px", fontSize: "20px", color: "white" }}
          >
            Day Setter
          </Typography>
          <Slider
            sx={{
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
              },
              margin: "auto",
              height: "600px",
            }}
            orientation="vertical"
            defaultValue={[20, 37]}
            max={24}
            value={value}
            min={0}
            marks={marks}
            onChange={handleChange}
            getAriaValueText={valuetext}
            valueLabelDisplay="off"
            onKeyDown={preventHorizontalKeyboardNavigation}
            disableSwap
          />
        </Box>
      </ThemeProvider>
      <div
        style={{
          height: 100,
          marginTop: "200px",
          border: "2px solid #4c525d",
          width: "40%",
          margin: "auto",
          padding: "20px",
          marginBottom: "100px",
        }}
      >
        <h2 className={styles.reset}>Reset Agenda</h2>
        <button onClick={() => reset()}>Reset</button>
      </div>
    </div>
  );
}

export default Profile;
