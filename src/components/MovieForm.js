import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
// import { firebase } from 'firebase';
// import { auth } from 'firebase';
import uuid from 'uuid';
//const TMDBLogo = "../images/tmdb.svg";

export default class MovieForm extends React.Component {
  constructor(props) { 
    super(props);  // calls parent constructor, lets us use "this"
   
    this.state = {
      id: props.movie ? props.movie.id : '',
      movieId: props.movie ? props.movie.movieId : '',
      title: props.movie ? props.movie.title : '',
      ratingComment: props.movie ? props.movie.ratingComment : '',
      rating: props.movie ? (props.movie.rating) : '',
      createdAt: props.movie ? moment(props.movie.createdAt) : moment(),
      imageUrl : props.movie ? props.movie.imageUrl : '',
      calendarFocused: false,
      error: '',
      suggestions: [],
      text: '',
      isLoaded: false,
      movieSelected: props.movie ? true : false,
    };
  }

  componentDidMount() {
     this.fetchMovies(' ');
}

fetchMovies (query)  {
  fetch('https://api.themoviedb.org/3/search/movie?query=' + query + '&api_key=cfe422613b250f702980a3bbf9e90716')
  .then(res => res.json())
  .then(json => {
      this.setState({
          isLoaded: true,
          suggestions: json,
      })
  });
}

onTextChanged = (e) => {
  this.onTitleChange(e);
  const value = e.target.value;
  let suggestions = [];
  if (value.length > 0 ) {
    // suggestions = this.items.sort().filter(v => regex.test(v));
    this.fetchMovies(value);
  }
  this.setState(() => ({ suggestions, text: value, title: value, poster_image: '', id: '' }));
}

suggestionSelected (value) {
  this.setState(() => ({
      text: value.original_title,
      title: value.original_title,
      movieId: value.id,
      imageUrl: 'https://image.tmdb.org/t/p/w500' + value.poster_path,
      movieSelected: true,
      suggestions: [],
  }))
}

renderSuggestions () {
  const { suggestions } = this.state;
  if (suggestions.length === 0){
      return null;
  }
  return (
    <ul>
      {suggestions.results.map((item) => <li key={item.id} onClick={() => this.suggestionSelected(item)}>{item.original_title}</li>)}
    </ul>
  );
}

  handleChange(event) {
    event.target.select();
  }

  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  onMovieIdChange = (e) => {
    const movieId = e.target.value;
    this.setState(() => ({ movieId }));
  };
  onRatingCommentChange = (e) => {
    const ratingComment = e.target.value;
    this.setState(() => ({ ratingComment }));
  };
  onImageUrlChange = (e) => {
    const imageUrl = e.target.value;
    this.setState(() => ({ imageUrl }));
  };
  onRatingChange = (e) => {
    const rating = e.target.value;

    if (!rating || rating.match(/^(10|\d)(\.\d{1,2})?$/)) {
   // if (!rating || rating.match(/^(10|\d)+(\.\d{1,2})?$/)) {
      this.setState(() => ({ rating }));
     }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.title || !this.state.rating  || !this.state.movieId   || !this.state.imageUrl  || !this.state.createdAt) {
      this.setState(() => ({ error: 'All fields are required' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        title: this.state.title,
        rating: parseFloat(this.state.rating, 10) , // parseFloat(this.rating),
        createdAt: this.state.createdAt.valueOf(),
        ratingComment: this.state.ratingComment,
        movieId: this.state.movieId,
        imageUrl : this.state.imageUrl
      });
    }
  };
  render() {
    const { text, isLoaded, items, poster_image, id, imageUrl, movieSelected } = this.state;

    return (
     
      
       <form className="form" onSubmit={this.onSubmit}>

          <p><b>Note that it might take 10 seconds for a new review to show up on the homepage.  Firebase can be slow! </b></p>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <input
            type="text"
            placeholder="Title - start typing to search"
            onChange={this.onTextChanged}
            autoFocus
            className="text-input"
            value={this.state.title}
          />
          {this.renderSuggestions()}
          <div className="input-group">         
            <div className="input-group__item">
              <input
                type="text"
                className="text-input"
                placeholder="Rating (0 - 10)"
                value={this.state.rating}
                onChange={this.onRatingChange} 
              />  
            </div>        
            
            <div className="input-group__item">
              <SingleDatePicker
                date={this.state.createdAt}
                onDateChange={this.onDateChange}
                focused={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
              />
            </div>  
          </div>
          <textarea
            placeholder="Add a comment (optional)"
            className="textarea"
            value={this.state.ratingComment}
            onChange={this.onRatingCommentChange}
          >
          </textarea>
          <input
              type="text"
              className="text-input"
              placeholder="Movie Poster URL"
              value={this.state.imageUrl} disabled
              style={{display: 'none' }}
              onChange={this.onImageUrlChange} 
            />
            <input
              type="text"
              placeholder="Movie Id"
              className="text-input"
              value={this.state.movieId} disabled
              style={{display: 'none' }}
              onChange={this.onMovieIdChange} 
            />
          <div>
            <button className="button">Save Movie Review</button>
          </div>
          <div className="movie-card" style={{display:  movieSelected ? 'block' : 'none' }} >
             <img className= "movie-header movie-cover" src={imageUrl}/>
        </div>
        </form>
    )
  }
}
