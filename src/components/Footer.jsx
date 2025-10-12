import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <style>{`
        .footer{background:#222;color:#fff;text-align:center;padding:12px;position:fixed;bottom:0;left:0;width:100%;z-index:100}
      `}</style>
      <p>© {new Date().getFullYear()} Kayalvizhi. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
