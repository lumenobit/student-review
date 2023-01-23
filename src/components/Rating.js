import React from 'react';

class Rating extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRating: 0
        }
    }

    ratingList = [1, 2, 3, 4, 5];

    resetRating() {
        this.setState(() => ({
            selectedRating: 0
        }));
    }

    ratingClicked(rating) {
        this.setState(() => ({
            selectedRating: rating
        }));
    }

    isRatingBlocked(rating) {
        return rating <= this.state.selectedRating
    }

    getRatingClass(rating) {
        if (this.isRatingBlocked(rating)) {
            return `rating-${this.state.selectedRating}`;
        } else {
            return ''
        }
    }

    render() {
        return (
            <fieldset>
                <ul className='rating-list'>
                    {this.ratingList.map(rating => (
                        <li key={rating} className="me-2">
                            <input type="radio" id={`rating-${rating}`}
                                name="rating" value={rating}
                                checked={rating === this.state.selectedRating}
                                onChange={() => this.ratingClicked(rating)} required />
                            <label htmlFor={`rating-${rating}`}>
                                <span className={`material-icons ${this.getRatingClass(rating)}`}>
                                    {this.isRatingBlocked(rating) ? 'star' : 'star_border'}
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
            </fieldset>
        )
    }
}

export default Rating;