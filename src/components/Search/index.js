import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API = 'https://my.api.mockaroo.com/api/v1/getcustomers?key=3f001a10';

const Search = (props) => {
  const [name, setName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [results, setResults] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     const result = await axios(API);
  //     setResults(result.data);
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.get(API);
      let filteredResults = res.data;
      if (name) {
        filteredResults = filteredResults.filter(
          (result) =>
            result.firstName.toLowerCase().includes(name.toLowerCase()) ||
            result.lastName.toLowerCase().includes(name.toLowerCase())
        );
      }
      if (customerId) {
        filteredResults = filteredResults.filter((result) =>
          result.customerId.toLowerCase().includes(customerId.toLowerCase())
        );
      }
      if (policyNumber) {
        filteredResults = filteredResults.filter((result) =>
          result.policyNumber.toLowerCase().includes(policyNumber.toLowerCase())
        );
      }
      setResults(filteredResults);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <p>Search data by</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={customerId}
          onChange={(event) => setCustomerId(event.target.value)}
        />
        <input
          type="text"
          name="policyNumber"
          placeholder="Policy Number"
          value={policyNumber}
          onChange={(event) => setPolicyNumber(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {results &&
            results.map((result, index) => (
              <div key={index} className="padding-top:10">
                <p>
                  <strong>Customer Name: </strong>
                  {result.firstName} {result.lastName}
                  <br />
                  <strong>Policy Number: </strong>
                  {result.policyNumber}
                  <br />
                  <a href={`/manage-users?customerId=${result.customerId}`}>details</a>
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;
