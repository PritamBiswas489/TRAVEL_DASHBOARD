import PageTitle from '@/components/PageTitle';
import AllDataTable from './components/AllDataTable';
export const metadata = {
  title: 'User list'
};
const Users = async () => {
  return <>
      <PageTitle title="User list" subTitle="Tables" />
      <AllDataTable />
    </>;
};
export default Users;