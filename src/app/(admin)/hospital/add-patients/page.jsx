import PageTitle from "@/components/PageTitle";
import AddPatients from "./components/AddPatients";
export const metadata = {
  title: 'Add Patients'
};
const AddPatientsPage = () => {
  return <>
      <PageTitle title='Add Patients' subTitle="Hospital" />
      <AddPatients />
    </>;
};
export default AddPatientsPage;