import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import classes from "./Home.module.scss";
import Input from "../ui-kit/Input";
import Button from "../ui-kit/Button";
import { cardFormat, currentDate, infoFormat } from "../utils/date";
import Radio from "../ui-kit/Radio";
import Card from "./Card";
import { pictures } from "../utils/picturesData";
import { useDispatch, useSelector } from "react-redux";
import { getHotels } from "../store/actions/hotels";
import * as Loader from "react-loader-spinner";

const Home = () => {
  const [favourites, setFavourites] = useState([]);

  const city = useRef(null);
  const checkIn = useRef(null);
  const checkOut = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels.hotels);
  const isFetching = useSelector((state) => state.hotels.isFetching);
  const isEmpty = useSelector((state) => state.hotels.isEmpty);

  useEffect(() => {
    if (!localStorage.getItem("SHC-user")) navigate("/login");
    else {
      dispatch(getHotels());
    }
  }, []);

  const searchHandler = (cityName, date, days, limit = 30) => {
    dispatch(getHotels(cityName, date, days, limit));
  };

  const logout = () => {
    localStorage.clear();
  };

  return (
    <>
      <div className={classes.header}>
        <h1>Simple Hotel Check</h1>
        <div className={classes.logout} onClick={() => logout()}>
          <Link className={classes.logout__link} to="/login">
            Выйти <FiLogOut style={{ marginLeft: "1rem" }} fontSize={18} />
          </Link>
        </div>
      </div>

      <div className={classes.body}>
        <div className={classes.left__panel}>
          <div className={classes.search__panel}>
            <Input
              ref={city}
              value="Москва"
              fontWeight="500"
              id="city"
              type="text"
              label="Локация"
              width="296px"
            />
            <Input
              ref={checkIn}
              value={currentDate()}
              fontWeight="500"
              id="date"
              type="date"
              label="Дата заселения"
              width="296px"
            />
            <Input
              ref={checkOut}
              value={1}
              fontWeight="500"
              id="days"
              type="number"
              label="Количество дней"
              width="296px"
            />
            <Button
              onClick={() =>
                searchHandler(
                  city.current.value,
                  checkIn.current.value,
                  parseInt(checkOut.current.value)
                )
              }
              text="Найти"
              width="296px"
            />
          </div>

          <div className={classes.favourite__panel}>
            <div>
              <h1>Избранное: {localStorage.getItem("SHC-user")}</h1>
              <Radio favourites={favourites} setFavourites={setFavourites} />
            </div>
            <div className={classes.favourites}>
              {favourites.length > 0 ? (
                favourites.map((card, index) => (
                  <Card
                    favourites={favourites}
                    setFavourites={setFavourites}
                    date={infoFormat(checkIn?.current?.value)}
                    duration={checkOut?.current?.value}
                    fav={true}
                    card={card}
                    key={index}
                  />
                ))
              ) : (
                <p>Список пуст 😭</p>
              )}
            </div>
          </div>
        </div>

        <div className={classes.right__panel}>
          <div className={classes.info}>
            <span className={classes.city}>
              Отели <b>{`>`}</b> {city?.current?.value}
            </span>
            <span className={classes.date}>
              {infoFormat(checkIn?.current?.value)}
            </span>
          </div>
          <div className={classes.carousel}>
            {pictures.map((picture, index) => (
              <img
                className={classes.carousel__picture}
                src={picture.url}
                alt={picture.alt}
                key={index}
              />
            ))}
          </div>
          <p className={classes.favourite__count}>
            Отелей добавлено в Избранное: <b>{favourites.length}</b>
          </p>
          <div className={classes.hotels}>
            {isEmpty ? (
              <div className={classes.error}>
                <p>В городе <b>"{city?.current?.value}"</b> не найдено ни одного отеля!</p>
              </div>
            ) : !isFetching ? (
              hotels.map((hotel, index) => (
                <Card
                  favourites={favourites}
                  setFavourites={setFavourites}
                  date={cardFormat(checkIn?.current?.value)}
                  duration={checkOut?.current?.value}
                  card={hotel}
                  key={index}
                />
              ))
            ) : (
              <div className={classes.loading}>
                <Loader.Oval
                  color="#717957"
                  secondaryColor="#AD8E51"
                  height={80}
                  width={80}
                />
                <p>Загрузка...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
