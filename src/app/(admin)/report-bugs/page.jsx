import PageTitle from '@/components/PageTitle';
import AllDataTable from './components/AllDataTable';
export const metadata = {
  title: 'Report Bugs'
};
const ReportBugs = async () => {
  return <>
      <PageTitle title="Report Bugs" subTitle="Tables" />
      <AllDataTable />
    </>;
};
export default ReportBugs;