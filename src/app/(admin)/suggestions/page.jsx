import PageTitle from '@/components/PageTitle';
import AllDataTable from './components/AllDataTable';
export const metadata = {
  title: 'Suggestions list'
};
const Suggestions = async () => {
  return <>
      <PageTitle title="Suggestions list" subTitle="Tables" />
      <AllDataTable />
    </>;
};
export default Suggestions;