import React from "react";
import styles from "./Card.module.css";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

function Card({ tour }) {
  console.log(tour);
  return (
    <div className={styles.card}>
      <div style={{ padding: "10px" }}>
        <div className={styles.content}>
          <div>
            <img src={tour.bestImage} alt="img" className={styles.mainImg} />
          </div>
          <div>
            <FavoriteRoundedIcon
              className={styles.like}
              style={{ fill: tour.likeExist ? "#FF6073" : "#FFFFFF" }}
            />
          </div>
        </div>
        <div className={styles.title}>{tour.title}</div>
        <div>￦&nbsp;{tour.price}</div>
      </div>
    </div>
  );
}

export default Card;
