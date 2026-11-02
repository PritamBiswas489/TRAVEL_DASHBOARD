import PageTitle from '@/components/PageTitle';
import AllDataTable from './components/AllDataTable';
export const metadata = {
  title: 'Vietnam Payments'
};
const VietnamPayments = async () => {
  return <>
      <PageTitle title="Vietnam Payments" subTitle="Tables" />
      <AllDataTable />
    </>;
};
export default VietnamPayments;