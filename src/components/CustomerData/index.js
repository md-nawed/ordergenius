import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const API = 'https://my.api.mockaroo.com/api/v1/getcustomers?key=3f001a10';

const CustomerData = (props) => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get('customerId');

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      const res = await axios.get(API);
      let filteredResults = res.data;
      if (customerId) {
        filteredResults = filteredResults.filter((result) =>
          result.customerId.toLowerCase().includes(customerId.toLowerCase())
        );
      }
      setResults(filteredResults);
    };
    fetchDataAndUpdateState();
  }, [customerId]);

  return (
    <div>
      {results.length > 0 && (
        <>
          <p>
            <strong>First Name: </strong>
            {results.firstName}
          </p>
          <p>
            <strong>Last Name: </strong>
            {results.lastName}
          </p>
          <p>
            <strong>Email: </strong>
            {results.email}
          </p>
          <p>
            <strong>Policy Number: </strong>
            {results.policyNumber}
          </p>
          <p>
            <strong>Date of Birth: </strong>
            {results.dateOfBirth}
          </p>
          <p>
            <strong>Phone Number: </strong>
            {results.phoneNumber}
          </p>
          <p>
            <strong>Address: </strong>
            {results.address}
          </p>
          <p>
            <strong>Postcode: </strong>
            {results.postcode}
          </p>
          <p>
            <strong>Bank Account Number: </strong>
            {results.bank?.accountNumberr}
          </p>
          <p>
            <strong>Bacnk Account Sort Code: </strong>
            {results.bank?.accountSortCode}
          </p>
        </>
      )}
    </div>
  );
};

export default CustomerData;
