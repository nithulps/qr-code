import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const qrRef = useRef();

  const handleChange = async (e) => {
    setText(e.target.value);

    if (e.target.value) {
      const qrCode = await QRCode.toDataURL(e.target.value);
      setQrCodeUrl(qrCode);
    } else {
      setQrCodeUrl('');
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'qrcode.png';
      link.click();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>QR Code Generator</h1>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter text or URL"
          className="input-box"
        />
        {qrCodeUrl && (
          <div ref={qrRef} className="qr-code">
            <img src={qrCodeUrl} alt="QR Code" />
          </div>
        )}
        <button className="download-button" onClick={downloadQRCode}>
          Download QR Code
        </button>
      </header>
    </div>
  );
};

export default App;
