import React from 'react';
import PropTypes from 'prop-types';

function Movie({id,year,title,poster,summary}){
    return (
        <div>
            <h5>
                {id}<br></br>
                {title}<br></br>
                {year}<br></br>
                {summary}<br></br>
                {poster}<br></br>
            </h5>
        </div>
    )
}

Movie.propTypes = {

    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
};

export default Movie;