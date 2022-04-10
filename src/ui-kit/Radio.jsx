import React, { useEffect } from "react";
import "./Radio.css";
import {CgArrowsExchangeAltV} from 'react-icons/cg'

const Radio = ({favourites, setFavourites}) => {
  
  const sortByRating = () => {
    setFavourites([...favourites].sort((prev, next) => next.stars - prev.stars))
  }

  const sortByPrice = () => {
    setFavourites([...favourites].sort((prev, next) => next.priceFrom - prev.priceFrom))
  }

  return (
    <div className="wrapper">
      <input onClick={() => sortByRating()} type="radio" name="select" id="option-1" defaultChecked />
      <input onClick={() => sortByPrice()} type="radio" name="select" id="option-2" />
      <label htmlFor="option-1" className="option option-1">
        <span>Рейтинг <CgArrowsExchangeAltV /> </span>
      </label>
      <label htmlFor="option-2" className="option option-2">
        <span>Цена <CgArrowsExchangeAltV /> </span>
      </label>
    </div>
  );
};

export default Radio;
