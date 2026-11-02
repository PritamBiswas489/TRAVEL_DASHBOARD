import PageTitle from '@/components/PageTitle';
import AllInputmask from '@/app/(admin)/forms/inputmask/components/AllInputmask';
export const metadata = {
  title: 'Inputmask'
};
const InputmaskPage = () => {
  return <>
      <PageTitle title="Form Inputmask" subTitle="Forms" />
      <AllInputmask />
    </>;
};
export default InputmaskPage;