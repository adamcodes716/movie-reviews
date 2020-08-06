import React from 'react';

export default class AutoCompleteText extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            suggestions: [],
            text: '',
            isLoaded: false,
            poster_image: '',
            id: '',
        }
    }

    componentDidMount() {
        console.log('in componenetDidMount');
        //fetch('https://jsonplaceholder.typicode.com/users')
        this.fetchMovies(' ');
    }


    fetchMovies (query)  {
        console.log ("fetching query", query);
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
        const value = e.target.value;
        console.log ('onTextChanged', value);
        let suggestions = [];
        if (value.length > 0 ) {
            console.log ('greater than 0');
          //  const regex = new RegExp(`^${value}`, 'i');
          // suggestions = this.items.sort().filter(v => regex.test(v));
          this.fetchMovies(value);
        }
        this.setState(() => ({ suggestions, text: value, poster_image: '', id: '' }));
    }

    suggestionSelected (value) {
        console.log ("we got a selected value");
        console.log ("selected name", value.original_title);
        this.setState(() => ({
            text: value.original_title,
            id: value.id,
            poster_image: 'https://image.tmdb.org/t/p/w500' + value.poster_path,
            suggestions: [],
        }))
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if (suggestions.length === 0){
            console.log ("no suggestions to render");
            return null;
        }
        return (
          <ul>
            {suggestions.results.map((item) => <li key={item.id} onClick={() => this.suggestionSelected(item)}>{item.original_title}</li>)}
          </ul>
        );
    }

    render () {
        const { text, isLoaded, items, poster_image, id } = this.state;
        // var { isLoaded, items } = this.state;
        console.log("loaded = ", isLoaded);
        console.log (items);

        if (!isLoaded){
            return <div>Loading.....</div>
        } else {
            return (
                
                <div> 
                This page is for testing the api call only
                <div className="AutoCompleteText">      
                    <input value ={text} onChange={this.onTextChanged}  type="text"  />
                        {this.renderSuggestions()}
                </div>        
                <br/><br/>
             
                <input value ={poster_image} type="text" disabled  />
                <img src={poster_image}/>



                <div className="list-item" to={`/edit/${id}`}>
                    <div>
                    <h3 className="list-item__title">description</h3>
                    <span className="list-item__sub-title">subtitle</span>
                    </div>
                    <h3 className="list-item__data">56.73</h3> 
                </div>

                </div>
            )
        }

    }

}

