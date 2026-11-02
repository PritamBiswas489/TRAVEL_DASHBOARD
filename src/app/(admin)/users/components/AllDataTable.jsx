'use client';

import { Grid } from 'gridjs-react';
import { Col, Row } from 'react-bootstrap';
import 'gridjs/dist/theme/mermaid.css';
import { html } from 'gridjs';
import { useEffect } from 'react';

const AllDataTable = () => {
  // Helper to format date as dd/mm/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/user-list`;

  // Handler to toggle user status (active/inactive)
  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/change-user-status`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId, status: currentStatus === 'active' ? 'inactive' : 'active' }),
        }
      );
      if (response.ok) {
        // Optionally, trigger a refresh or update the table
        // window.location.reload();
      }
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

   useEffect(() => {
    const handler = (e) => {
      const target = e.target;
      if (target.classList.contains('status-toggle-switch')) {
        const userId = target.getAttribute('data-user-id');
        const currentStatus = target.getAttribute('data-current-status');
        handleStatusToggle(userId, currentStatus);
        // Update the data-current-status attribute to reflect the new status
        target.setAttribute('data-current-status', currentStatus === 'active' ? 'inactive' : 'active');
      }
    };
    document.addEventListener('change', handler);
    return () => {
      document.removeEventListener('change', handler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <style>
        {`
          .gridjs-pagination .gridjs-pages button.gridjs-currentPage {
            background-color: #007bff !important;
            color: #fff !important;
            border-color: #007bff !important;
          }
          /* Ensure all column headers are visible and not hidden by overflow */
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
      <Row>
        <Col lg={12}>
          <Grid
            columns={[
              { name: 'ID', width: '80px' },
              {
                name: 'Phone',
                width: '120px',
                formatter: (cell, row) => {
                  const userId = row.cells[0].data;
                  return html(
                    `<a href="/users/${userId}" style="color: #007bff; text-decoration: none; cursor: pointer;">${cell}</a>`
                  );
                },
              },
              { name: 'Name', width: '120px' },
              { name: 'Email', width: '180px' },
              { name: 'Address', width: '180px' },
              { name: 'DOB', width: '100px' },
              {
                name: 'Status',
                width: '100px',
                formatter: (cell, row) => {
                  const userId = row.cells[0].data;
                  const currentStatus = cell;
                  const isActive = currentStatus === 'active';
                  const switchId = `switch-status-${userId}`;
                  return html(`
                    <div>
                      <input
                        type="checkbox"
                        id="${switchId}"
                        data-switch="success"
                        class="status-toggle-switch"
                        ${isActive ? 'checked' : ''}
                        data-user-id="${userId}"
                        data-current-status="${currentStatus}"
                        style="display: none;"
                        
                      />
                      <label
                        for="${switchId}"
                        data-on-label="Yes"
                        data-off-label="No"
                        class="mb-0 d-block"
                        style="cursor:pointer;"
                      ></label>
                    </div>
                  `);
                },
              },
              { name: 'Created At', width: '120px' },
              { name: 'KYC Status', width: '120px' },
              { name: 'KYC Applicant ID', width: '140px' },
              { name: 'ILS Wallet', width: '100px' },
              { name: 'USD Wallet', width: '200px' },
              { name: 'EURO Wallet', width: '200px' },
              { name: 'App URL', width: '200px' },
            ]}
            server={{
              url: apiUrl,
              then: (data) =>
                data.data.map((user) => [
                  user.id,
                  user.phoneNumber,
                  user.name,
                  user.email,
                  user.address,
                  formatDate(user.dob),
                  user.status,
                  formatDate(user.createdAt),
                  user?.kyc?.status,
                  user?.kyc?.applicantId,
                  user?.wallets.find(wallet => wallet.currency === 'ILS')?.balance || 0,
                  user?.wallets.find(wallet => wallet.currency === 'USD')?.balance || 0,
                  user?.wallets.find(wallet => wallet.currency === 'EUR')?.balance || 0,
                  user.appUrl || '',
                ]),
              total: (data) => data.pagination.totalItems,
            }}
            pagination={{
              enabled: true,
              limit: 10,
              server: {
                url: (prev, page, limit) => {
                  const url = new URL(prev, window.location.origin);
                  url.searchParams.set('limit', limit);
                  url.searchParams.set('page', parseInt(page) + 1);
                  return process.env.NEXT_PUBLIC_API_BASE_URL + url.pathname + url.search;
                },
              },
            }}
            search={{
              enabled: true,
              server: {
                url: (prev, keyword) => {
                  const url = new URL(prev, window.location.origin);
                  url.searchParams.set('search', keyword);
                  if (!url.searchParams.has('limit')) url.searchParams.set('limit', 10);
                  if (!url.searchParams.has('page')) url.searchParams.set('page', 1);
                  return process.env.NEXT_PUBLIC_API_BASE_URL + url.pathname + url.search;
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
        </Col>
      </Row>
       
    </>
  );
};

export default AllDataTable;
