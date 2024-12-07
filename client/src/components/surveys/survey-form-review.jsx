import { useDispatch, useSelector } from 'react-redux'
import formFields from './form-fields'
import { submitSurvey } from '../../actions'
import { useNavigate } from 'react-router-dom'

const SurveyFormReview = ({ onCancel }) => {
  const formValues = useSelector(state => state.form.surveyForm.values)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const reviewFields = formFields.map(({ name, label }) =>
    <div key={name}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  )

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className='green btn-flat right white-text'
        onClick={() => dispatch(submitSurvey(formValues, navigate))}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  )
}

export default SurveyFormReview
