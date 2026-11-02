import PageTitle from "@/components/PageTitle";
import AppointmentStat from "./components/AppointmentStat";
import AppointmentsList from "./components/AppointmentsList";
export const metadata = {
  title: 'Appointment'
};
const AppointmentsPage = () => {
  return <>
      <PageTitle title='Appointments' subTitle="Hospital" />
      <AppointmentStat />
      <AppointmentsList />
    </>;
};
export default AppointmentsPage;