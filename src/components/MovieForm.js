import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class MovieForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.movie ? props.movie.title : '',
      ratingComment: props.movie ? props.movie.ratingComment : '',
      rating: props.movie ? (props.movie.rating) : '',
      createdAt: props.movie ? moment(props.movie.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    };
  }
  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  onRatingCommentChange = (e) => {
    const ratingComment = e.target.value;
    this.setState(() => ({ ratingComment }));
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

    if (!this.state.title ) { // || !this.state.rating) {
      this.setState(() => ({ error: 'Please provide a title and a rating.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        title: this.state.title,
        rating: this.state.rating , // parseFloat(this.rating),
        createdAt: this.state.createdAt.valueOf(),
        ratingComment: this.state.ratingComment
      });
    }
  };
  render() {
    return (
       <form className="form" onSubmit={this.onSubmit}>
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
            className="text-input"
            placeholder="Rating"
            value={this.state.rating}
            onChange={this.onRatingChange} 
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your Movie Review (optional)"
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
