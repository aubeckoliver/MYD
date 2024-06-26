import styles from "../style/Events.module.css";
import WorkIcon from "@mui/icons-material/Work";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Link } from "react-router-dom";

function Events() {
  return (
    <div style={{ backgroundColor: "#282c34" }}>
      <h1 className={styles.h1}>Events</h1>
      <br />
      <br />
      <div className={styles.cards}>
        <Link to="/work" style={{ color: "black" }}>
          <div className={styles.card}>
            <WorkIcon
              fontSize="large"
              sx={{ backgroundColor: "white", padding: "78px" }}
            />
          </div>
        </Link>
        <Link to="/workout" style={{ color: "black" }}>
          <div className={styles.card}>
            <FitnessCenterIcon
              sx={{
                backgroundColor: "white",
                padding: "78px",
              }}
              fontSize="large"
            />
          </div>
        </Link>
      </div>
      <div className={styles.cards}>
        <Link to="/shopping" style={{ color: "black" }}>
          <div className={styles.card}>
            <ShoppingCartIcon
              fontSize="large"
              sx={{ backgroundColor: "white", padding: "78px" }}
            />
          </div>
        </Link>
        <Link to="/study" style={{ color: "black" }}>
          <div className={styles.card}>
            <AutoStoriesIcon
              sx={{
                backgroundColor: "white",
                padding: "78px",
              }}
              fontSize="large"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Events;
