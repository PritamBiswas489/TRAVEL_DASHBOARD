import PageTitle from "@/components/PageTitle";
import PaymentList from "./components/PaymentList";
import PaymentStat from "./components/PaymentStat";
export const metadata = {
  title: 'Payments'
};
const PaymentsPage = () => {
  return <>
      <PageTitle title='Payments' subTitle="Hospital" />
      <PaymentStat />
      <PaymentList />
    </>;
};
export default PaymentsPage;