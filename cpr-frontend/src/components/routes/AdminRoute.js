import React from "react";
import Sidebars from "../admin/Sidebar";

function AdminRoute({ children }) {
  return (
    <div className="flex">
      {/* Sidebar on the left */}
      <div className="w-1/4">
        <Sidebars />
      </div>

      {/* Content on the right */}
      <div className="w-3/4 p-4">
        {children} {/* Render children here */}
      </div>
    </div>
  );
}

export default AdminRoute;
