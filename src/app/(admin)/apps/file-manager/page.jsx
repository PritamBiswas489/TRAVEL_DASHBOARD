import PageTitle from "@/components/PageTitle";
import FIleManager from "./components/FIleManager";
export const metadata = {
  title: 'File Manager'
};
const FileManagerPage = () => {
  return <>
      <PageTitle title='File Manager' subTitle="Apps" />
      <FIleManager />
    </>;
};
export default FileManagerPage;