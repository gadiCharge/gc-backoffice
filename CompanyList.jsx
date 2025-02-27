import React, { useEffect, useState } from "react";
import axios from "axios";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/companies")
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Companies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div key={company.CompanyCode} className="p-4 bg-white shadow-lg rounded-xl">
            <h3 className="text-lg font-semibold">{company.CompanyName}</h3>
            <p className="text-gray-600">OmID : {company.OmID}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
