import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

const MovieListItem = ({id, createdAt, imgUrl, rating, title, imageUrl}) => (
    <div className="movie-card">
    <div className="movie-header movie-cover" style={{ backgroundImage: `url('${imageUrl}')` }}>
      <div className="header-icon-container">
      <a href={`/edit/${id}`}>
       <i className="material-icons header-icon"></i>  
        </a>
      </div>
    </div>
    <div className="movie-content">
      <div className="movie-content-header">
        <a href={`/edit/${id}`}>
          <h3 className="movie-title">{title}</h3>
        </a>
        <div className="imax-logo"></div>
      </div>
      <div className="movie-info">
        <div className="info-section">
          <label>Review Date</label>
          <span>{moment(createdAt).format('MMMM Do, YYYY')}</span>
        </div>
        <div className="info-section">
          <label>Rating</label>
          <span>{rating}</span>
        </div>    
      </div>
    </div>
  </div>

);

export default MovieListItem;