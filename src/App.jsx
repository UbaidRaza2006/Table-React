// // // import logo from './logo.svg';
// // // import './App.css';

// // // function App() {
// // //   return (
// // //     <div className="App">
// // //       <header className="App-header">
// // //         <img src={logo} className="App-logo" alt="logo" />
// // //         <p>
// // //           Edit <code>src/App.js</code> and save to reload.
// // //         </p>
// // //         <a
// // //           className="App-link"
// // //           href="https://reactjs.org"
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //         >
// // //           Learn React
// // //         </a>
// // //       </header>
// // //     </div>
// // //   );
// // // }

// // // export default App;


// // import React, { useState } from 'react';
// // import { DataGrid } from '@mui/x-data-grid'; // For the table
// // import Modal from 'react-modal'; // For the modal
// // import data from './data.json'; // Importing the JSON data
// // import VisibilityIcon from '@mui/icons-material/Visibility'; // Eye icon

// // // Custom styles for the modal
// // const customStyles = {
// //   content: {
// //     top: '50%',
// //     left: '75%',
// //     right: 'auto',
// //     bottom: 'auto',
// //     marginRight: '-50%',
// //     transform: 'translate(-50%, -50%)',
// //     width: '400px',
// //     padding: '20px'
// //   },
// // };

// // Modal.setAppElement('#root'); // To improve accessibility

// // function App() {
// //   const [modalIsOpen, setIsOpen] = useState(false); // For controlling the modal
// //   const [selectedRow, setSelectedRow] = useState(null); // Storing the selected row data

// //   // Columns definition for the DataGrid (table)
// //   const columns = [
// //     { field: 'Roll No', headerName: 'Roll No', width: 100 },
// //     { field: 'Name', headerName: 'Name', width: 150 },
// //     { field: 'Email Address', headerName: 'Email', width: 200 },
// //     { field: 'SELECT YOUR CLASS', headerName: 'Class', width: 180 },
// //     { field: 'WEBSITE DEPLOYED LINK', headerName: 'Website', width: 250 },
// //     {
// //       field: 'actions',
// //       headerName: 'Actions',
// //       width: 100,
// //       renderCell: (params) => (
// //         <VisibilityIcon
// //           style={{ cursor: 'pointer' }}
// //           onClick={() => openModal(params.row)}
// //         />
// //       ),
// //     },
// //   ];

// //   // Function to open the modal and set selected row data
// //   const openModal = (rowData) => {
// //     setSelectedRow(rowData);
// //     setIsOpen(true);
// //   };

// //   // Function to close the modal
// //   const closeModal = () => {
// //     setIsOpen(false);
// //     setSelectedRow(null);
// //   };

// //   return (
// //     <div style={{ height: 600, width: '80%', margin: 'auto', marginTop: '50px' }}>
// //       <h1 style={{ textAlign: 'center' }}>Student Submissions</h1>
// //       {/* DataGrid Table */}
// //       <DataGrid rows={data} columns={columns} pageSize={5} getRowId={(row) => row["Roll No"]} />
      
// //       {/* Modal */}
// //       <Modal
// //         isOpen={modalIsOpen}
// //         onRequestClose={closeModal}
// //         style={customStyles}
// //       >
// //         {selectedRow && (
// //           <div>
// //             <h2>Details for {selectedRow.Name}</h2>
// //             <p><strong>Roll No:</strong> {selectedRow["Roll No"]}</p>
// //             <p><strong>Email:</strong> {selectedRow["Email Address"]}</p>
// //             <p><strong>Class:</strong> {selectedRow["SELECT YOUR CLASS"]}</p>
// //             <p><strong>Website:</strong> <a href={selectedRow["WEBSITE DEPLOYED LINK"]} target="_blank" rel="noreferrer">View</a></p>
// //             <p><strong>GitHub:</strong> <a href={selectedRow["GITHUB LINK"]} target="_blank" rel="noreferrer">Repo</a></p>
// //             <p><strong>Demo Video:</strong> {selectedRow["DEMO VIDEO LINK"] ? <a href={selectedRow["DEMO VIDEO LINK"]} target="_blank" rel="noreferrer">Watch</a> : "Not Available"}</p>
// //             <button onClick={closeModal} style={{ marginTop: '20px' }}>Close</button>
// //           </div>
// //         )}
// //       </Modal>
// //     </div>
// //   );
// // }

// // export default App;


// import React, { useState } from 'react';
// import './App.css'; // CSS ko alag file mein include karte hain

// const SimpleForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);
//     // Yaha tum form data ko backend bhej sakte ho
//   };

//   return (
//     <div className="form-container">
//       <h2>Contact Us</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="message">Message:</label>
//           <textarea
//             id="message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default SimpleForm;


import React, { useState } from 'react';
import data from './data.json'; // Importing the JSON data

function App() {
  const [modalIsOpen, setIsOpen] = useState(false); // For controlling the modal
  const [selectedRow, setSelectedRow] = useState(null); // Storing the selected row data

  // Function to open the modal and set selected row data
  const openModal = (rowData) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedRow(null);
  };

  return (
    <div style={{ width: '80%', margin: 'auto', marginTop: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Student Submissions</h1>

      {/* Table to display data */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Roll No</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Class</th>
            <th style={tableHeaderStyle}>Website</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row["Roll No"]} style={tableRowStyle}>
              <td style={tableCellStyle}>{row["Roll No"]}</td>
              <td style={tableCellStyle}>{row["Name"]}</td>
              <td style={tableCellStyle}>{row["Email Address"]}</td>
              <td style={tableCellStyle}>{row["SELECT YOUR CLASS"]}</td>
              <td style={tableCellStyle}>
                <a href={row["WEBSITE DEPLOYED LINK"]} target="_blank" rel="noreferrer">
                  View
                </a>
              </td>
              <td style={tableCellStyle}>
                <button style={actionButtonStyle} onClick={() => openModal(row)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalIsOpen && selectedRow && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2>Details for {selectedRow.Name}</h2>
            <p><strong>Roll No:</strong> {selectedRow["Roll No"]}</p>
            <p><strong>Email:</strong> {selectedRow["Email Address"]}</p>
            <p><strong>Class:</strong> {selectedRow["SELECT YOUR CLASS"]}</p>
            <p><strong>Website:</strong> <a href={selectedRow["WEBSITE DEPLOYED LINK"]} target="_blank" rel="noreferrer">View</a></p>
            <p><strong>GitHub:</strong> <a href={selectedRow["GITHUB LINK"]} target="_blank" rel="noreferrer">Repo</a></p>
            <p><strong>Demo Video:</strong> {selectedRow["DEMO VIDEO LINK"] ? <a href={selectedRow["DEMO VIDEO LINK"]} target="_blank" rel="noreferrer">Watch</a> : "Not Available"}</p>
            <button onClick={closeModal} style={{ marginTop: '20px' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// CSS Styles for table and modal
const tableHeaderStyle = {
  borderBottom: '2px solid #ddd',
  padding: '10px',
  textAlign: 'left',
  backgroundColor: '#f4f4f4',
};

const tableCellStyle = {
  borderBottom: '1px solid #ddd',
  padding: '10px',
};

const tableRowStyle = {
  backgroundColor: '#fff',
  textAlign: 'left',
};

const actionButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

export default App;

