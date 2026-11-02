'use client'

import { useState, useEffect, useMemo } from 'react'
import { Grid } from 'gridjs-react'
import { html } from 'gridjs'
import { Col, Row, Modal, Button } from 'react-bootstrap'
import 'gridjs/dist/theme/mermaid.css'
import SpinnerOverlay from '@/components/SpinnerOverlay'

const AllDataTable = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedTran, setSelectedTran] = useState(null)
  const [tranDetails, setTranDetails] = useState(null)

  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/philippines-payment-list`

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
  

  const [loadingDetails, setLoadingDetails] = useState(false)

  // useEffect(() => {
  //   if (selectedTran) {
  //     setLoadingDetails(true)
  //     fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/transaction-detail-by-id?id=${selectedTran}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         setTranDetails(data?.data || null)
  //       })
  //       .catch(error => {
  //         console.error('Error fetching transaction details:', error)
  //         setTranDetails(null)
  //       })
  //       .finally(() => {
  //         setShowModal(true)
  //         setLoadingDetails(false)
  //       })
  //   }
  // }, [selectedTran])



  const handleIdClick = (id) => {
    setSelectedTran(id)
     
  }

  // 🧠 Memoized columns
  const columns = useMemo(() => [
    { name: 'ID', width: '250px' },
    { name: 'Tran ID', width: '250px' },
    { name: 'User name', width: '250px' },
    { name: 'User Phone Number', width: '250px' },
    { name: 'Merchant Name', width: '250px' },
    { name: 'Merchant City', width: '250px' },
    { name: 'Payment Amt.', width: '250px' },
    { name: 'Wallet Amt.', width: '250px' },
    { name: 'Wallet Cur.', width: '250px' },
    { name: 'Status', width: '250px' },
    { name: 'Failed Reason', width: '250px' },
    { name: 'Is Fixed Price?', width: '250px' },
    { name: 'Created At', width: '250px' },
  ], [])

  // 🧠 Memoized server config
  const serverConfig = useMemo(() => ({
    url: apiUrl,
    then: (data) =>
      data.data.map((tranData) => [
        html(
          `<button style="background:none;border:none;color:#007bff;cursor:pointer;text-decoration:underline;" data-id="${tranData.id}">${tranData.id}</button>`
        ),
        tranData?.transaction_info_code,
        tranData?.user?.name,
        tranData?.user?.phoneNumber,
        tranData.merchantName,
        tranData.merchantCity,
        tranData.amount,
        tranData.amountInUserWalletCurrency,
        tranData.walletCurrency,
        tranData.transaction_status,
        tranData?.callBack_data?.failed_reason || '-',
        tranData.isFixedPrice ? 'Yes' : 'No',
        formatDate(tranData.createdAt),
      ]),
    total: (data) => data.pagination.totalItems,
  }), [apiUrl])

  // 🧠 Memoized Grid component
  const memoizedGrid = useMemo(() => (
    <Grid
      key="grid" // prevent remount
      columns={columns}
      server={serverConfig}
      pagination={{
        enabled: true,
        limit: 10,
        server: {
          url: (prev, page, limit) => {
            const url = new URL(prev, window.location.origin)
            url.searchParams.set('limit', limit)
            url.searchParams.set('page', parseInt(page) + 1)
            return process.env.NEXT_PUBLIC_API_BASE_URL + url.pathname + url.search
          },
        },
      }}
      search={{
        enabled: true,
        server: {
          url: (prev, keyword) => {
            const url = new URL(prev, window.location.origin)
            url.searchParams.set('search', keyword)
            if (!url.searchParams.has('limit')) url.searchParams.set('limit', 10)
            if (!url.searchParams.has('page')) url.searchParams.set('page', 1)
            return process.env.NEXT_PUBLIC_API_BASE_URL + url.pathname + url.search
          },
        },
      }}
      sort={true}
      style={{
        table: {
          height: '400px',
        },
      }}
      resizable
      autoWidth
    />
  ), [columns, serverConfig])

  // 📌 Event listener to handle ID button clicks
  useEffect(() => {
    const handleButtonClick = (event) => {
      if (
        event.target.tagName === 'BUTTON' &&
        event.target.dataset.id &&
        event.target.closest('.gridjs-table')
      ) {
        handleIdClick(event.target.dataset.id)
      }
    }

    document.addEventListener('click', handleButtonClick)
    return () => {
      document.removeEventListener('click', handleButtonClick)
    }
  }, [])

  return (
    <>
      <style>
        {`
          .gridjs-pagination .gridjs-pages button.gridjs-currentPage {
            background-color: #007bff !important;
            color: #fff !important;
            border-color: #007bff !important;
          }
          .gridjs-th {
            white-space: normal !important;
            text-overflow: unset !important;
            overflow: visible !important;
            max-width: 200px;
          }
          .gridjs-table {
            table-layout: auto !important;
          }
        `}
      </style>
      {loadingDetails && <SpinnerOverlay />}
      <Row>
        <Col lg={12}>
          {memoizedGrid}
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tranDetails ? (
            <div>
              <Row className="mb-2">
                <Col xs={5} className="fw-bold">Transaction ID:</Col>
                <Col xs={7}>{tranDetails.id}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={5} className="fw-bold">User Name:</Col>
                <Col xs={7}>{tranDetails?.user?.name || '-'}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={5} className="fw-bold">User Phone:</Col>
                <Col xs={7}>{tranDetails?.user?.phoneNumber || '-'}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={5} className="fw-bold">Type:</Col>
                <Col xs={7}>{tranDetails.type || '-'}</Col>
              </Row>
               <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Old Wallet Balance:</Col>
                  <Col xs={7}>{tranDetails?.oldWalletBalance}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">New Wallet Balance:</Col>
                  <Col xs={7}>{tranDetails?.newWalletBalance}</Col>
                </Row>
              <Row className="mb-2">
                <Col xs={5} className="fw-bold">Transaction Type:</Col>
                <Col xs={7}>
                  {tranDetails.paymentId
                    ? 'Deposit'
                    : tranDetails.transferId
                    ? 'Transfer'
                    : tranDetails.transferRequestId
                    ? 'Transfer Request'
                    : '-'}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={5} className="fw-bold">Amount:</Col>
                <Col xs={7}>{tranDetails.paymentAmt || '-'}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={5} className="fw-bold">Currency:</Col>
                <Col xs={7}>{tranDetails.paymentCurrency || '-'}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={5} className="fw-bold">Status:</Col>
                <Col xs={7}>{tranDetails.status || '-'}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={5} className="fw-bold">Created At:</Col>
                <Col xs={7}>{formatDate(tranDetails.createdAt)}</Col>
              </Row>
              {tranDetails.paymentId && (
                <>
                  <Row className="mb-2">
                    <Col xs={5} className="fw-bold">Payment transaction ID:</Col>
                    <Col xs={7}>{tranDetails?.walletPayment?.PelecardTransactionId}</Col>
                  </Row>
                  <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Payment Voucher Id:</Col>
                  <Col xs={7}>{tranDetails?.walletPayment?.VoucherId}</Col>
                </Row>
                 <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Payment Credit Card Number:</Col>
                  <Col xs={7}>{tranDetails?.walletPayment?.CreditCardNumber}</Col>
                </Row>
                 <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Payment Token:</Col>
                  <Col xs={7}>{tranDetails?.walletPayment?.Token}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Payment Credit Card ExpDate:</Col>
                  <Col xs={7}>{tranDetails?.walletPayment?.CreditCardExpDate}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Payment Debit Approve Number:</Col>
                  <Col xs={7}>{tranDetails?.walletPayment?.DebitApproveNumber}</Col>
                </Row>
               
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Payment Card Heb Name:</Col>
                  <Col xs={7}>{tranDetails?.walletPayment?.CardHebName}</Col>
                </Row>
                 <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Payment TotalPayments:</Col>
                  <Col xs={7}>{tranDetails?.walletPayment?.TotalPayments}</Col>
                </Row>
                </>
              )}
              {tranDetails.transferId && (
                <>
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Transfer Amount:</Col>
                  <Col xs={7}>{tranDetails?.transfer?.amount}</Col>
                  
                </Row>
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Transfer Currency:</Col>
                  <Col xs={7}>{tranDetails?.transfer?.currency}</Col>

                </Row>
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Transfer Status:</Col>
                  <Col xs={7}>{tranDetails?.transfer?.status}</Col>

                </Row>
                 <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Money Sender phone number:</Col>
                  <Col xs={7}>{tranDetails?.transfer?.sender?.phoneNumber}</Col>

                </Row>
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Money Sender name:</Col>
                  <Col xs={7}>{tranDetails?.transfer?.sender?.name}</Col>

                </Row>
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Money Receiver phone number:</Col>
                  <Col xs={7}>{tranDetails?.transfer?.receiver?.phoneNumber}</Col>
                </Row>
                 
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Money Receiver name:</Col>
                  <Col xs={7}>{tranDetails?.transfer?.receiver?.name}</Col>

                </Row>
                </>
              
              )}
              {tranDetails.transferRequestId && (
                  <>
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Transfer Request Amount:</Col>
                  <Col xs={7}>{tranDetails?.transferRequest?.amount}</Col>
                  
                </Row>
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Transfer request Currency:</Col>
                  <Col xs={7}>{tranDetails?.transferRequest?.currency}</Col>

                </Row>
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Transfer Status:</Col>
                  <Col xs={7}>{tranDetails?.transferRequest?.status}</Col>

                </Row>
                 <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Request Sender phone number:</Col>
                  <Col xs={7}>{tranDetails?.transferRequest?.sender?.phoneNumber}</Col>

                </Row>
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Request Sender name:</Col>
                  <Col xs={7}>{tranDetails?.transferRequest?.sender?.name}</Col>

                </Row>
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Request Receiver phone number:</Col>
                  <Col xs={7}>{tranDetails?.transferRequest?.receiver?.phoneNumber}</Col>
                </Row>
                 
                <Row className="mb-2">
                  <Col xs={5} className="fw-bold">Request Receiver name:</Col>
                  <Col xs={7}>{tranDetails?.transferRequest?.receiver?.name}</Col>

                </Row>
                </>
              )}
              
              
              
              {/* Add more fields as needed */}
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AllDataTable
