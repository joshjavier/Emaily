import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSurveys } from '../../actions'

const SurveyList = () => {
  const surveys = useSelector(state => state.surveys)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSurveys())
  }, [dispatch])

  return (
    <div>
      {[...surveys].reverse().map(survey =>
        <div key={survey._id} className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{survey.title}</span>
            <p>{survey.question}</p>
            <p className='right'>Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      )}
    </div>
  )
}

export default SurveyList
