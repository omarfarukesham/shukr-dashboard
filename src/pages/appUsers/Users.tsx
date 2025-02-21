import { useGetAllUsersQuery } from '@/feature/auth/authSlice';
import { format } from 'date-fns';
import { FaUserLock, FaUserCheck } from 'react-icons/fa';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  createdAt: string;
}

export default function Users() {
  const { data: users, isLoading, error } = useGetAllUsersQuery(undefined);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center p-8 text-red-500">Error loading users</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <div className="text-sm cursor-pointer bg-primary text-white hover:bg-secondary rounded-full px-4 py-2">
          Total Users: {users?.data?.length || 0}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.data?.map((user: User) => (
              <tr key={user._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                {user.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                {user.isBlocked ? (
                  <FaUserLock className="text-red-500 mr-2" />
                ) : (
                  <FaUserCheck className="text-green-500 mr-2" />
                )}
                <span className={`text-sm ${user.isBlocked ? 'text-red-500' : 'text-green-500'}`}>
                  {user.isBlocked ? 'Blocked' : 'Active'}
                </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(user.createdAt), 'MMM dd, yyyy')}
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
