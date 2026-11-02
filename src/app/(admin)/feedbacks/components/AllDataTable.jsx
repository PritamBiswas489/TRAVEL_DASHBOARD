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

  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/feedback-list`

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
  
  const [loadingDetails, setLoadingDetails] = useState(false)

  
  const handleIdClick = (id) => {
    setSelectedTran(id)
     
  }
  // 🧠 Memoized columns
  const columns = useMemo(
    () => [
      { name: 'ID', width: '250px' },
      { name: 'Category Name', width: '250px' },
      { name: 'Comment', width: '250px' },
      { name: 'Rating', width: '250px' },
      { name: 'User name', width: '250px' },
      { name: 'User email', width: '250px' },
      { name: 'User phone', width: '250px' },
      { name: 'Created At', width: '250px' },
    ],
    [],
  )

  // 🧠 Memoized server config
  const serverConfig = useMemo(() => ({
    url: apiUrl,
    then: (data) =>
      data.data.map((feedbackData) => [
         feedbackData.id,
         feedbackData?.category?.engText,
         feedbackData?.comment,
         feedbackData?.rating,
         feedbackData?.user?.name,
         feedbackData?.user?.email,
         feedbackData?.user?.phoneNumber,
         formatDate(feedbackData.createdAt),
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

      
    </>
  )
}

export default AllDataTable
