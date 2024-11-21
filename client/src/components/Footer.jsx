import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="container mx-auto px-5 flex justify-center py-4 items-center">
        <p>© 2024 Ayan's Blog</p>
      </footer>
    </div>
  );
};

const MemoizedFooter = React.memo(Footer);

export { MemoizedFooter as Footer };
