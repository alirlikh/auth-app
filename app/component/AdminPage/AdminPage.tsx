import RoleProtected from "../RoleProtected/RoleProtected"

const AdminPage = () => {
  return (
    <RoleProtected requiredRole="admin" fallback={null}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Panel</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Admin Controls</h3>
          <p className="text-gray-600">This page is only accessible to administrators.</p>
        </div>
      </div>
    </RoleProtected>
  )
}
export default AdminPage