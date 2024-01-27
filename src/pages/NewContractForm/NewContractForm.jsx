import React, { useEffect, useState } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import axios from 'axios';
import { Api } from '../../GlobalApi';
import { useAppContext } from '../../contextApi/useContextHook';

const NewContractForm = () => {
  const [name, setname] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [availableTemplates, setAvailableContracts] = useState([]);
  const { contracts, setContracts, setMySelectedContract } = useAppContext();
  const token = window.sessionStorage.getItem('token');

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const handleNameChange = (e) => {
    setname(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${Api}/admin/new-contract`,
        { name: name, filename: selectedTemplate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          setContracts([...contracts, res.data.data]);
          setMySelectedContract(res.data.data);
        }
      });
  };

  useEffect(() => {
    axios.get(`${Api}/admin/available-contracts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setAvailableContracts(res.data.data);
    });
  }, []);

  return (
    <Dashboard>
      <div>
        <select onChange={handleTemplateChange} value={selectedTemplate}>
          <option value="" disabled>Select a template</option>
          {availableTemplates?.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <input type="text" name="name" value={name} onChange={handleNameChange} />
        <button onClick={handleSubmit} type="submit">Create new Contract</button>
      </div>
    </Dashboard>
  );
};

export default NewContractForm;
