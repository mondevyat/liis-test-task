import React, { useEffect } from "react";
import classes from "./Card.module.scss";
import { HiOutlineHeart } from "react-icons/hi";
import { BsFillStarFill } from "react-icons/bs";
import { GiHouse } from "react-icons/gi";
import { v4 as uuidv4 } from "uuid"

const Card = ({ card, fav = false, date, duration, favourites, setFavourites }) => {
  let { hotelName, stars, priceFrom } = card;
  
  useEffect(() => {
    setFavourites([...favourites].sort((prev, next) => next.stars - prev.stars))
  }, [])
  

  const favouritesHandler = (hotel) => {
    hotel.datetime = {date: date, duration: duration}
    if (!favourites.includes(hotel)) {
      setFavourites(favourites.concat(hotel));
    } else {
      let index = favourites.indexOf(hotel);
      let temp = [
        ...favourites.slice(0, index),
        ...favourites.slice(index + 1),
      ];
      setFavourites(temp);
    }
  };

  return (
    <>
      <div className={classes.card}>
        {!fav ? (
          <div className={classes.hotel__picture}>
            <GiHouse fill="#41522E" fontSize={32} />
          </div>
        ) : (
          <></>
        )}
        <div className={classes.wrapper}>
          <div className={classes.top}>
            <span className={classes.name}>{hotelName}</span>
            {fav ? (
              <HiOutlineHeart
                onClick={() => favouritesHandler(card)}
                style={{ cursor: "pointer", opacity: "1" }}
                className={classes.checked}
                fill="transparent"
                fontSize={21}
              />
            ) : (
              <HiOutlineHeart
                onClick={() => favouritesHandler(card)}
                style={{ cursor: "pointer", opacity: ".2" }}
                fill="transparent"
                fontSize={21}
              />
            )}
          </div>
          <div className={classes.middle}>
            <span className={classes.date}>
              {fav ? card?.datetime?.date : date}&nbsp;&nbsp;–&nbsp;&nbsp;{fav ? card?.datetime?.duration : duration} день
            </span>
          </div>
          <div className={classes.bottom}>
            <div>
              {Array.from({ length: stars }, (i) => i + 1).map(() => (
                <BsFillStarFill
                  style={{ marginRight: ".25rem" }}
                  fill="#CDBC1E"
                  fontSize={17}
                  key={uuidv4()}
                />
              ))}
              {Array.from({ length: 5 - stars }, (i) => i + 1).map(() => (
                <BsFillStarFill
                  style={{ marginRight: ".25rem" }}
                  fill="#dedede"
                  fontSize={17}
                  key={uuidv4()}
                />
              ))}
            </div>
            <span className={classes.price}>
              <span>Price: </span>
              {Math.round(priceFrom).toLocaleString("ru-RU", {
                style: "decimal",
              })}{" "}
              ₽
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
