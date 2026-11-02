import React, { Suspense } from 'react';
import TopNavigationBarPage from './TopNavigationBar/page';
import VerticalNavigationBar from './VerticalNavigationBar/page';
import FallbackLoading from '../FallbackLoading';
import Footer from './Footer';
const VerticalLayout = ({
  children
}) => {
  return <div className="wrapper">
      <Suspense>
        <TopNavigationBarPage />
      </Suspense>

      <Suspense fallback={<FallbackLoading />}>
        <VerticalNavigationBar />
      </Suspense>

      <div className="page-content">
        <div className="container-fluid">{children}</div>
        <Footer />
      </div>
    </div>;
};
export default VerticalLayout;