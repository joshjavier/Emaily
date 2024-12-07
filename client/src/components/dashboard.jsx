import { Link } from 'react-router-dom'
import SurveyList from './surveys/survey-list'

const Dashboard = () => {
  return (
    <div>
      <SurveyList />

      <div class="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i class="large material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
