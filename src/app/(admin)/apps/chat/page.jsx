import PageTitle from '@/components/PageTitle';
import ChatData from './components/ChatData';
export const metadata = {
  title: 'Chart'
};
const ChatPage = () => {
  return <>
      <PageTitle title='Chat' />
      <ChatData />
    </>;
};
export default ChatPage;