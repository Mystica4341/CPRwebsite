import React from 'react'
import Sidebars from '../admin/Sidebar'
import UserTable from '../admin/UserTable'

function AdminRoute(props) {
  return (
    <div className="flex">
      {/* Sidebar on the left */}
      <div className="w-1/4 ">
        <Sidebars />
      </div>

      {/* UserTable on the right */}
      <div className="w-3/4 p-4">
        <UserTable />
      </div>
    </div>
  )
}

export default AdminRoute