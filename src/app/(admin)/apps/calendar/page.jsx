import PageTitle from '@/components/PageTitle';
import { Row } from 'react-bootstrap';
import CalendarPage from './components/CalendarPage';
export const metadata = {
  title: 'Calender'
};
const Schedule = () => {
  return <>
      <PageTitle title='Calendar' />
      <Row>
        <CalendarPage />
      </Row>
    </>;
};
export default Schedule;