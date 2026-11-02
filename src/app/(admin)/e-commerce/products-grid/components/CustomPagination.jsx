'use client';

import React from 'react';
import { Pagination } from 'react-bootstrap';
const CustomPagination = () => {
  return <Pagination className="mb-0">
      <Pagination.Item className=" disabled">
        Previous
      </Pagination.Item>
      <Pagination.Item>1</Pagination.Item>
      <Pagination.Item className=" active" aria-current="page">
        2
      </Pagination.Item>
      <Pagination.Item>3</Pagination.Item>
      <Pagination.Item>
        Next
      </Pagination.Item>
    </Pagination>;
};
export default CustomPagination;