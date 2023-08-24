import { ChangeEvent, Fragment } from 'react';
import { STARS_RATING } from '../../const';

type StarsProps = {
  formData: {
    rating: number;
    review: string;
  };
  handleFieldChange: (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isSubmitting: boolean;
}

function Stars({ formData, handleFieldChange, isSubmitting }: StarsProps): JSX.Element {
  return (
    <div className="reviews__rating-form form__rating" data-testid="rating-container">
      {STARS_RATING.map((value, i) => {
        const index = STARS_RATING.length - i;
        return (
          <Fragment key={index}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={index}
              id={`${index}-stars`}
              type="radio"
              checked = {+formData.rating === index}
              onChange={(evt) => handleFieldChange(evt)}
              required
              disabled={isSubmitting}
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

export default Stars;
