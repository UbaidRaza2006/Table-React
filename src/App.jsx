import React, { useState, useEffect } from 'react';
import data from './data.json'; // Importing the JSON data
import { FaCopy, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // Track screen width

  const openModal = (rowData) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRow(null);
  };

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    alert('URL copied to clipboard');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    // Extract unique categories from data
    const categories = [...new Set(data.map((item) => item["CATEGORY"]))];
    setUniqueCategories(categories);

    // Update screen width on resize
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filtered Data
  const filteredData = selectedCategory
    ? data.filter((row) => row["CATEGORY"] === selectedCategory)
    : [];

  return (
    <div style={{ backgroundColor: "#2980b9", paddingTop: "20px", minHeight: '600px', }}>
      <div style={pageStyle}>
        <h1 style={headingStyle}>Student Submissions</h1>
        <p style={totalCountStyle}>
          Total Submissions: {selectedCategory ? filteredData.length : data.length}
        </p>

        {/* Dropdown for selecting category */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          style={selectStyle}
        >
          <option value="">Select a Category</option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Filtered Submissions Table */}
        {selectedCategory ? (
          <>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Roll No</th>
                  {screenWidth < 1000 ? null : <th style={tableHeaderStyle}>Name</th>}
                  {screenWidth < 1000 ? null : <th style={tableHeaderStyle}>Email</th>}
                  <th style={tableHeaderStyle}>Class</th>
                  <th style={tableHeaderStyle}>Website</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row["Roll No"]} style={tableRowStyle}>
                    <td style={tableCellStyle}>{row["Roll No"]}</td>
                    {screenWidth < 1000 ? null : <td style={tableCellStyle}>{row["Name"]}</td>}
                    {screenWidth < 1000 ? null : <td style={tableCellStyle}>{row["Email Address"]}</td>}
                    <td style={tableCellStyle}>{row["SELECT YOUR CLASS"]}</td>
                     <td style={tableCellStyle}>
                      <div style={actionContainerStyle}>
                        <button
                          style={iconButtonStyle}
                          onClick={() => copyToClipboard(row["WEBSITE DEPLOYED LINK"])}
                        >
                          <FaCopy />
                        </button>
                        <button style={iconButtonStyle}>
                          <a href={row["WEBSITE DEPLOYED LINK"]} target="_blank" rel="noreferrer" style={linkStyle}>
                            <FaExternalLinkAlt />
                          </a>
                        </button>
                        <button style={iconButtonStyle} onClick={() => openModal(row)}>
                          <FaInfoCircle />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
              <th style={tableHeaderStyle}>Roll No</th>
                  {screenWidth < 1000 ? null : <th style={tableHeaderStyle}>Name</th>}
                  {screenWidth < 1000 ? null : <th style={tableHeaderStyle}>Email</th>}
                  <th style={tableHeaderStyle}>Class</th>
                  <th style={tableHeaderStyle}>Website</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row["Roll No"]} style={tableRowStyle}>
                  <td style={tableCellStyle}>{row["Roll No"]}</td>
                  {screenWidth < 1000 ? null : <td style={tableCellStyle}>{row["Name"]}</td>}
                  {screenWidth < 1000 ? null : <td style={tableCellStyle}>{row["Email Address"]}</td>}
                  <td style={tableCellStyle}>{row["SELECT YOUR CLASS"]}</td>
                  <td style={tableCellStyle}>
                    <div style={actionContainerStyle}>
                      <button
                        style={iconButtonStyle}
                        onClick={() => copyToClipboard(row["WEBSITE DEPLOYED LINK"])}
                      >
                        <FaCopy />
                      </button>
                      <button style={iconButtonStyle}>
                        <a href={row["WEBSITE DEPLOYED LINK"]} target="_blank" rel="noreferrer" style={linkStyle}>
                          <FaExternalLinkAlt />
                        </a>
                      </button>
                      <button style={iconButtonStyle} onClick={() => openModal(row)}>
                        <FaInfoCircle />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

{modalIsOpen && selectedRow && (
  <div style={modalOverlayStyle} onClick={handleOverlayClick}>
    <div style={modalContentStyle}>
      <div style={modalHeaderStyle}>
        <h2 style={modalHeadingStyle}>Details for {selectedRow.Name}</h2>
        <button onClick={closeModal} style={closeButtonStyle}>×</button>
      </div>
      <div style={modalBodyStyle}>
        <div style={modalInfoStyle}>
          <p><strong>Roll No:</strong> <span style={modalTextStyle}>{selectedRow["Roll No"]}</span></p>
          <p><strong>Email:</strong> <span style={modalTextStyle}>{selectedRow["Email Address"]}</span></p>
          <p><strong>Class:</strong> <span style={modalTextStyle}>{selectedRow["SELECT YOUR CLASS"]}</span></p>
          <p><strong>Category:</strong> <span style={modalTextStyle}>{selectedRow["CATEGORY"]}</span></p>
          <p><strong>Website:</strong> <a href={selectedRow["WEBSITE DEPLOYED LINK"]} target="_blank" rel="noreferrer" style={modalLinkStyle}>View</a></p>
          <p><strong>GitHub:</strong> <a href={selectedRow["GITHUB LINK"]} target="_blank" rel="noreferrer" style={modalLinkStyle}>Repo</a></p>
          <p><strong>Demo Video:</strong> {selectedRow["DEMO VIDEO LINK"] ? <a href={selectedRow["DEMO VIDEO LINK"]} target="_blank" rel="noreferrer" style={modalLinkStyle}>Watch</a> : "Not Available"}</p>
        </div>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

// CSS Styles for the table, page, and modal
const pageStyle = {
  width: '90%',
  margin: 'auto',
  fontFamily: 'Arial, sans-serif',
  background: 'linear-gradient(135deg, #f0f4f8, #d4f6f9)',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.15)',
  minHeight: '500px', // Ensures the page has a minimum height
};

const headingStyle = {
  textAlign: 'center',
  color: '#2c3e50',
  fontSize: '36px',
  marginBottom: '10px',
  fontWeight: 'bold',
};

const totalCountStyle = {
  textAlign: 'center',
  color: '#2980b9',
  fontSize: '22px',
  marginBottom: '20px',
};

const selectStyle = {
  width: '400px', // Set width to 400px
  maxWidth: '95%', // Allow the select box to take up 95% of the width when screen width is less than 500px
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #2980b9',
  margin: '0 auto 20px auto', // Center the select box
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  fontSize: '16px',
  backgroundColor: '#fff',
  transition: 'border-color 0.3s ease',
  display: 'block', // Ensure it's a block element to center it
};

// const tableStyle = {
//   width: '100%',
//   borderCollapse: 'collapse',
//   marginTop: '20px',
//   backgroundColor: '#fff',
//   borderRadius: '5px',
//   boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
// };

const tableHeaderStyle = {
  backgroundColor: '#2980b9',
  color: '#fff',
  padding: '10px',
  textAlign: 'left',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  backgroundColor: '#fff',
  borderRadius: '10px', // Increased border radius
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden', // Ensures border radius is applied correctly
};

const tableRowStyle = {
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '15px', // Increased padding for greater height
  color: '#333',
};


const actionContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const iconButtonStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '#2980b9',
  fontSize: '20px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#2980b9',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: '#bad4d7',
  padding: '30px',
  borderRadius: '15px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  width: '90%',  // Keep width at 90%
  maxWidth: '600px',
  position: 'relative',
  boxSizing: 'border-box', // Include padding in width
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '15px',
  borderBottom: '1px solid #9c9c9c',
  marginBottom: '15px',
};

const modalHeadingStyle = {
  fontSize: '26px',
  margin: 0,
  color: 'black',
};

const modalBodyStyle = {
  lineHeight: '1.5',
};

const modalInfoStyle = {
  fontSize: '18px',
  padding: '15px 0',
  color: 'black',
};

const modalTextStyle = {
  fontSize: '18px',
  color: '#1d5d88',
};

const modalLinkStyle = {
  fontSize: '18px',
  textDecoration: 'none',
  color: '#1d5d88',
  fontWeight: '500',
};

const closeButtonStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '30px',
  color: '#888',
  transition: 'color 0.3s',
};

closeButtonStyle[':hover'] = {
  color: '#c0392b', // Color change on hover
};

// Optional: Add CSS transition to the modal to fade in/out
const modalAnimationStyle = {
  animation: 'fadeIn 0.3s ease-out',
};

const mediaQueryStyle = `
  @media (max-width: 700px) {
    .modal-content {
      width: 90%; // 90% width when screen width is less than 700px
    }
  }
`;


// Add CSS for animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`, styleSheet.cssRules.length, mediaQueryStyle);

export default App;
