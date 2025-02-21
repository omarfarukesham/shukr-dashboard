import { format } from 'date-fns';
import { FaEye } from 'react-icons/fa';

// Mock order data
const orders = [
  {
    id: '123',
    customerName: 'John Doe',
    email: 'john@example.com',
    items: [
      { name: 'Product 1', quantity: 2, price: 29.99 },
      { name: 'Product 2', quantity: 1, price: 49.99 }
    ],
    total: 109.97,
    status: 'Delivered',
    orderDate: '2024-02-15T10:30:00Z',
  },
  // Add more mock orders as needed
].map((order, index) => ({
  ...order,
  id: `ORD-${2024}${index + 1}`,
  status: ['Pending', 'Processing', 'Delivered', 'Cancelled'][Math.floor(Math.random() * 4)],
}));

export default function Order() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="text-sm text-gray-500">
          Total Orders: {orders.length}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.customerName}</div>
                  <div className="text-sm text-gray-500">{order.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {order.items.map(item => 
                      `${item.name} (${item.quantity})`
                    ).join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(order.orderDate), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <FaEye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
