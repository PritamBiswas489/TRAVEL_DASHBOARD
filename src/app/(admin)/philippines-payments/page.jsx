import PageTitle from '@/components/PageTitle';
import AllDataTable from './components/AllDataTable';
export const metadata = {
  title: 'Philippines Payments'
};
const PhilippinesPayments = async () => {
  return <>
      <PageTitle title="Philippines Payments" subTitle="Tables" />
      <AllDataTable />
    </>;
};
export default PhilippinesPayments;