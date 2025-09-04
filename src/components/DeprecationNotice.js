import React, { useState } from 'react';
import './DeprecationNotice.css'; // We'll create this file next

const DeprecationNotice = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="deprecation-modal-overlay">
      <div className="deprecation-modal">
        <h2>⚠️ This Project Is Deprecated</h2>
        <p>This application, HSE Clubs, is no longer actively maintained nor updated.</p>
        <div className="modal-actions">
          {/* <a href="[LINK_TO_NEW_SUITE]" target="_blank" rel="noopener noreferrer">
            <span className="link-text">Visit the New App Suite</span>
          </a> */}
          <button onClick={() => setIsVisible(false)}>
            <span className="link-text">Dismiss</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeprecationNotice;