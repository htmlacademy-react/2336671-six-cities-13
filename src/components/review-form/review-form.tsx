import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { StarsRating } from '../../const';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { submitReviewAction } from '../../store/api-actions';

const MIN_CHARACTER_LENGTH = 50;
const MAX_CHARACTER_LENGTH = 300;

function ReviewForm():JSX.Element {

  const params = useParams();
  const dispatch = useAppDispatch();

  const [isSubmiting, setSubminting] = useState(false);

  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    evt.preventDefault();
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSubminting(true);
    dispatch(submitReviewAction({id: params.ids as string, comment: formData.review, rating: Number(formData.rating)})).then(() => {
      setSubminting(false);
      setFormData({rating: 0, review: ''});
    });
  };

  function Stars(): JSX.Element {
    return (
      <div className="reviews__rating-form form__rating" data-testid="rating-container">
        {StarsRating.map((value, i) => {
          const index = StarsRating.length - i;
          return (
            <Fragment key={index}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={index}
                id={`${index}-stars`}
                type="radio"
                checked = {+formData.rating === index}
                onChange={handleFieldChange}
                required
                disabled={isSubmiting}
                data-testid="rating-element"
              />
              <label
                htmlFor={`${index}-stars`}
                className="reviews__rating-label form__rating-label"
                title={value}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
      data-testid="review-container"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <Stars />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={MIN_CHARACTER_LENGTH}
        maxLength={MAX_CHARACTER_LENGTH}
        onChange={handleFieldChange}
        value={formData.review}
        required
        disabled={isSubmiting}
        data-testid="review-element"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>. {(formData.review.length > 0 && formData.review.length < MIN_CHARACTER_LENGTH) && `You are currently using ${formData.review.length} characters.`}
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmiting || !formData.rating || formData.review.length < MIN_CHARACTER_LENGTH || formData.review.length > MAX_CHARACTER_LENGTH || isSubmiting}
        >
          {isSubmiting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
