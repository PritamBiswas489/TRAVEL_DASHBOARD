import PageTitle from '@/components/PageTitle';
import AllDataTable from './components/AllDataTable';
export const metadata = {
  title: 'Cambodia Payments'
};
const CambodiaPayments = async () => {
  return <>
      <PageTitle title="Cambodia Payments" subTitle="Tables" />
      <AllDataTable />
    </>;
};
export default CambodiaPayments;