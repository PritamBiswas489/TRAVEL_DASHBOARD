import PageTitle from '@/components/PageTitle';
import AddDoctors from './components/AddDoctors';
export const metadata = {
  title: 'Add Doctor'
};
const AddDoctorsPage = () => {
  return <>
      <PageTitle title='Add Doctors' subTitle="Hospital" />
      <AddDoctors />
    </>;
};
export default AddDoctorsPage;