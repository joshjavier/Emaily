import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './survey-field'
import validateEmails from '../../utils/validate-emails'
import formFields from './form-fields'

const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {
  const renderFields = () => (
    <div>
      {formFields.map(({ label, name }) =>
        <Field key={name} label={label} type="text" name={name} component={SurveyField} />
      )}
    </div>
  )

  return (
    <div>
      <form onSubmit={handleSubmit(onSurveySubmit)}>
        {renderFields()}
        <Link to="/surveys" className='red btn-flat white-text'>Cancel</Link>
        <button type='submit' className='teal btn-flat right white-text'>
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  )
}

function validate(values) {
  const errors = {}

  errors.emails = validateEmails(values.emails || '');

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value'
    }
  });

  return errors
}

export default reduxForm({
  form: 'surveyForm',
  validate,
  destroyOnUnmount: false,
})(SurveyForm)
