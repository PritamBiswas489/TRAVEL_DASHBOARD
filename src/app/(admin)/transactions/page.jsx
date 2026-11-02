import PageTitle from '@/components/PageTitle';
import AllDataTable from './components/AllDataTable';
export const metadata = {
  title: 'Transaction list'
};
const Transactions = async () => {
  return <>
      <PageTitle title="Transaction list" subTitle="Tables" />
      <AllDataTable />
    </>;
};
export default Transactions;