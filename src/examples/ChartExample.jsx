import React, { useState } from 'react';
import {
  LineChart,
  AreaChart,
  BarChart,
  PieChart,
  EChartsLine,
  EChartsBar,
  EChartsPie,
  EChartsWrapper,
} from '../components/Charts';

// Sample data
const lineData = [
  { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { name: 'Mar', revenue: 2000, expenses: 9800, profit: -7800 },
  { name: 'Apr', revenue: 2780, expenses: 3908, profit: -1128 },
  { name: 'May', revenue: 1890, expenses: 4800, profit: -2910 },
  { name: 'Jun', revenue: 2390, expenses: 3800, profit: -1410 },
  { name: 'Jul', revenue: 3490, expenses: 4300, profit: -810 },
];

const pieData = [
  { name: 'Desktop', value: 65 },
  { name: 'Mobile', value: 28 },
  { name: 'Tablet', value: 7 },
];

const barData = [
  { name: 'Mon', visitors: 120 },
  { name: 'Tue', visitors: 200 },
  { name: 'Wed', visitors: 150 },
  { name: 'Thu', visitors: 80 },
  { name: 'Fri', visitors: 70 },
  { name: 'Sat', visitors: 110 },
  { name: 'Sun', visitors: 130 },
];

// Advanced ECharts options
const advancedLineOptions = {
  title: {
    text: 'Advanced Line Chart',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Sales', 'Marketing', 'Development'],
    top: 30,
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Sales',
      type: 'line',
      data: [120, 132, 101, 134, 90, 230, 210],
      smooth: true,
      lineStyle: {
        width: 3,
      },
      emphasis: {
        focus: 'series',
      },
    },
    {
      name: 'Marketing',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310],
      smooth: true,
      lineStyle: {
        width: 3,
      },
      emphasis: {
        focus: 'series',
      },
    },
    {
      name: 'Development',
      type: 'line',
      data: [150, 232, 201, 154, 190, 330, 410],
      smooth: true,
      lineStyle: {
        width: 3,
      },
      emphasis: {
        focus: 'series',
      },
    },
  ],
};

const ChartExample = () => {
  const [activeTab, setActiveTab] = useState('recharts');

  const tabStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    borderBottom: '1px solid var(--color-border)',
  };

  const tabButtonStyle = (isActive) => ({
    padding: '0.75rem 1rem',
    border: 'none',
    background: isActive ? 'var(--color-primary)' : 'transparent',
    color: isActive ? 'white' : 'var(--color-text)',
    cursor: 'pointer',
    borderRadius: 'var(--radius-md)',
    fontWeight: isActive ? 600 : 400,
    fontSize: 'var(--text-sm)',
  });

  return (
    <div className="chart-examples" style={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'var(--font-base)'
    }}>
      <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: '1rem' }}>
        Chart Component Examples
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Theme-aware chart components built on Recharts and ECharts
      </p>

      {/* Tab Navigation */}
      <div style={tabStyle}>
        <button
          style={tabButtonStyle(activeTab === 'recharts')}
          onClick={() => setActiveTab('recharts')}
        >
          Recharts
        </button>
        <button
          style={tabButtonStyle(activeTab === 'echarts')}
          onClick={() => setActiveTab('echarts')}
        >
          ECharts
        </button>
      </div>

      {/* Recharts Examples */}
      {activeTab === 'recharts' && (
        <div style={{ display: 'grid', gap: '3rem' }}>
          
          {/* Line Chart */}
          <section>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
              Line Chart
            </h2>
            <div style={{ 
              background: 'var(--color-bg-secondary)', 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)'
            }}>
              <LineChart 
                data={lineData} 
                height={300}
                lines={[
                  { dataKey: 'revenue', name: 'Revenue', color: 'var(--color-success)' },
                  { dataKey: 'expenses', name: 'Expenses', color: 'var(--color-error)' },
                  { dataKey: 'profit', name: 'Profit', color: 'var(--color-primary)' },
                ]}
              />
            </div>
          </section>

          {/* Area Chart */}
          <section>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
              Area Chart
            </h2>
            <div style={{ 
              background: 'var(--color-bg-secondary)', 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)'
            }}>
              <AreaChart 
                data={lineData} 
                height={300}
                stacked={true}
                areas={[
                  { dataKey: 'revenue', name: 'Revenue', color: 'var(--color-info)' },
                  { dataKey: 'expenses', name: 'Expenses', color: 'var(--color-warning)' },
                ]}
              />
            </div>
          </section>

          {/* Bar Chart */}
          <section>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
              Bar Chart
            </h2>
            <div style={{ 
              background: 'var(--color-bg-secondary)', 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)'
            }}>
              <BarChart 
                data={barData} 
                height={300}
                bars={[
                  { dataKey: 'visitors', name: 'Daily Visitors', color: 'var(--color-primary)' },
                ]}
              />
            </div>
          </section>

          {/* Pie Chart */}
          <section>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
              Pie Chart
            </h2>
            <div style={{ 
              background: 'var(--color-bg-secondary)', 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)'
            }}>
              <PieChart 
                data={pieData} 
                height={300}
                dataKey="value"
                nameKey="name"
              />
            </div>
          </section>

        </div>
      )}

      {/* ECharts Examples */}
      {activeTab === 'echarts' && (
        <div style={{ display: 'grid', gap: '3rem' }}>
          
          {/* Simple ECharts Line */}
          <section>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
              ECharts Line Chart
            </h2>
            <div style={{ 
              background: 'var(--color-bg-secondary)', 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)'
            }}>
              <EChartsLine 
                data={barData} 
                height={300}
                xField="name"
                yField="visitors"
              />
            </div>
          </section>

          {/* Simple ECharts Bar */}
          <section>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
              ECharts Bar Chart
            </h2>
            <div style={{ 
              background: 'var(--color-bg-secondary)', 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)'
            }}>
              <EChartsBar 
                data={barData} 
                height={300}
                xField="name"
                yField="visitors"
              />
            </div>
          </section>

          {/* Simple ECharts Pie */}
          <section>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
              ECharts Pie Chart
            </h2>
            <div style={{ 
              background: 'var(--color-bg-secondary)', 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)'
            }}>
              <EChartsPie 
                data={pieData} 
                height={300}
                nameField="name"
                valueField="value"
              />
            </div>
          </section>

          {/* Advanced ECharts */}
          <section>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
              Advanced ECharts with Custom Options
            </h2>
            <div style={{ 
              background: 'var(--color-bg-secondary)', 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)'
            }}>
              <EChartsWrapper 
                options={advancedLineOptions} 
                height={400}
              />
            </div>
          </section>

        </div>
      )}

      {/* Chart Features */}
      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
          Chart Features
        </h2>
        <div style={{ 
          display: 'grid', 
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          <div style={{ 
            padding: '1.5rem', 
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)'
          }}>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}>
              🎨 Theme Integration
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              <li>Automatic color adaptation from design tokens</li>
              <li>Dark/light mode support</li>
              <li>Consistent typography and spacing</li>
            </ul>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)'
          }}>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}>
              📱 Responsive Design
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              <li>Mobile-first responsive containers</li>
              <li>Touch-friendly interactions</li>
              <li>Adaptive layouts</li>
            </ul>
          </div>

          <div style={{ 
            padding: '1.5rem', 
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)'
          }}>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}>
              🔧 Easy Configuration
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              <li>Simple props for common use cases</li>
              <li>Advanced options for custom charts</li>
              <li>Type-safe with PropTypes</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChartExample;
