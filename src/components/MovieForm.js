import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { auth } from 'firebase';

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
      displayName : !props.movie ? 'Adam' : props.movie.displayName,
      calendarFocused: false,
      error: ''
    };
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
    console.log ("Changing image URL");
    this.setState(() => ({ imageUrl }));
  };
  onRatingChange = (e) => {
    const rating = e.target.value;

   // if (!rating || rating.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ rating }));
   //  }
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

    if (!this.state.title || !this.state.rating || !this.state.ratingComment   || !this.state.movieId   || !this.state.imageUrl  || !this.state.createdAt) {
      this.setState(() => ({ error: 'All fields are required' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        title: this.state.title,
        rating: parseFloat(this.state.rating, 10) , // parseFloat(this.rating),
        createdAt: this.state.createdAt.valueOf(),
        ratingComment: this.state.ratingComment,
        movieId: this.state.movieId,
        imageUrl : this.state.imageUrl,
        displayName : "Adam"
      });
    }
  };
  render() {
    return (
       <form className="form" onSubmit={this.onSubmit}>
          <p><b>Note that it might take 10 seconds for a new review to show up.  Firebase can be slow! </b></p>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <input
            type="text"
            placeholder="Title"
            autoFocus
            className="text-input"
            value={this.state.title}
             onChange={this.onTitleChange} 
          />
          <input
            type="text"
            placeholder="Movie Id"
            className="text-input"
            value={this.state.movieId}
             onChange={this.onMovieIdChange} 
          />
          <input
            type="text"
            className="text-input"
            placeholder="Rating"
            value={this.state.rating}
            onChange={this.onRatingChange} 
          />
          <input
            type="text"
            className="text-input"
            placeholder="Movie Poster URL"
            value={this.state.imageUrl}
            onChange={this.onImageUrlChange} 
          />
          <p>You can use this URL if you'd like:  https://tinyurl.com/y3kls5w3</p>
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your Movie Review"
            className="textarea"
            value={this.state.ratingComment}
            onChange={this.onRatingCommentChange}
          >
          </textarea>
          <div>
            <button className="button">Save Movie Review</button>
          </div>
        </form>
    )
  }
}
