import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { submitReviewAction } from '../../store/api-actions';
import Stars from '../stars/stars';

const MIN_CHARACTER_LENGTH = 50;
const MAX_CHARACTER_LENGTH = 300;

function ReviewForm():JSX.Element {

  const params = useParams();
  const dispatch = useAppDispatch();

  const [isSubmitting, setSubminting] = useState(false);

  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });

  const handleFieldChange = useCallback((evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    evt.preventDefault();
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value });
  }, [formData]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSubminting(true);
    dispatch(submitReviewAction({id: params.ids as string, comment: formData.review, rating: Number(formData.rating)})).then(() => {
      setSubminting(false);
      setFormData({rating: 0, review: ''});
    });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
      data-testid="review-container"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <Stars formData={formData} handleFieldChange={handleFieldChange} isSubmitting={isSubmitting} />
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
        disabled={isSubmitting}
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
          disabled={isSubmitting || !formData.rating || formData.review.length < MIN_CHARACTER_LENGTH || formData.review.length > MAX_CHARACTER_LENGTH || isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
