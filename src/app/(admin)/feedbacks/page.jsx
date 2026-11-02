import PageTitle from '@/components/PageTitle';
import AllDataTable from './components/AllDataTable';
export const metadata = {
  title: 'Feedback list'
};
const Feedbacks = async () => {
  return <>
      <PageTitle title="Feedback list" subTitle="Tables" />
      <AllDataTable />
    </>;
};
export default Feedbacks;