import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaUsers, FaShoppingCart, FaDollarSign, FaExchangeAlt } from 'react-icons/fa';

// Mock data for the chart
const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
];

// Mock metrics data
const metrics = [
  { title: 'Total Orders', value: '1,234', icon: <FaShoppingCart />, change: '+12%', color: 'bg-blue-500' },
  { title: 'Total Users', value: '45,678', icon: <FaUsers />, change: '+5%', color: 'bg-green-500' },
  { title: 'Revenue', value: '$123,456', icon: <FaDollarSign />, change: '+8%', color: 'bg-purple-500' },
  { title: 'Returns', value: '234', icon: <FaExchangeAlt />, change: '-2%', color: 'bg-red-500' },
];

function Home() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{metric.title}</p>
                <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
                <span className={`text-sm ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change} from last month
                </span>
              </div>
              <div className={`${metric.color} p-4 rounded-full text-white`}>
                {metric.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Sales Overview</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.3} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;