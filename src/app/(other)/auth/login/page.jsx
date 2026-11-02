import logoDark from '@/assets/images/logo-dark.png';
import logo from '@/assets/images/logo.png';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import LoginForm from './components/LoginForm';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import { currentYear, developedBy } from '@/context/constants';
export const metadata = {
  title: 'Log In'
};
const LoginPage = () => {
  return <>
      <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xl={4} lg={5} md={6}>
            <Card className="overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0">
              <Link href="/dashboard/sales" className="auth-brand mb-3">
                <Image src={logoDark} alt="dark logo" height={80} className="logo-dark" />
                <Image src={logo} alt="logo light" height={80} className="logo-light" />
              </Link>
              <h3 className="fw-semibold mb-2">Login your account</h3>
              <p className="text-muted mb-4">Enter your email address and password to access admin panel.</p>
              <LoginForm />
               
            </Card>
          </Col>
        </Row>
      </div>
    </>;
};
export default LoginPage;