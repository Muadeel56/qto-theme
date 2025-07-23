import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  AreaChart as RechartsAreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

// Theme-aware color palette
const getChartColors = () => {
  const root = document.documentElement;
  return [
    getComputedStyle(root).getPropertyValue('--chart-color-1').trim() || '#f2b60f',
    getComputedStyle(root).getPropertyValue('--chart-color-2').trim() || '#22c55e',
    getComputedStyle(root).getPropertyValue('--chart-color-3').trim() || '#3b82f6',
    getComputedStyle(root).getPropertyValue('--chart-color-4').trim() || '#f59e0b',
    getComputedStyle(root).getPropertyValue('--chart-color-5').trim() || '#ef4444',
    getComputedStyle(root).getPropertyValue('--chart-color-6').trim() || '#8b5cf6',
    getComputedStyle(root).getPropertyValue('--chart-color-7').trim() || '#06b6d4',
    getComputedStyle(root).getPropertyValue('--chart-color-8').trim() || '#84cc16',
  ];
};

const getThemeColors = () => {
  const root = document.documentElement;
  return {
    text: getComputedStyle(root).getPropertyValue('--chart-text').trim() || '#171717',
    grid: getComputedStyle(root).getPropertyValue('--chart-grid').trim() || '#e5e5e5',
    background: getComputedStyle(root).getPropertyValue('--chart-bg').trim() || '#ffffff',
    legend: getComputedStyle(root).getPropertyValue('--chart-legend').trim() || '#525252',
  };
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  const themeColors = getThemeColors();
  
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: themeColors.background,
        border: `1px solid ${themeColors.grid}`,
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-sm)',
        boxShadow: 'var(--shadow-md)',
        fontSize: 'var(--text-sm)',
        color: themeColors.text,
      }}>
        <p style={{ margin: 0, marginBottom: '0.25rem', fontWeight: 600 }}>
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ 
            margin: 0, 
            color: entry.color,
            fontSize: 'var(--text-xs)'
          }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Base Chart Component
const BaseChart = ({ 
  data, 
  height = 300, 
  responsive = true, 
  showGrid = true, 
  showTooltip = true, 
  showLegend = true,
  xAxisKey = 'name',
  children,
  ...props 
}) => {
  const themeColors = getThemeColors();
  
  const chartProps = {
    data,
    ...props,
  };

  return (
    <div style={{ width: '100%', height: responsive ? height : 'auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        {React.cloneElement(children, {
          ...chartProps,
          children: [
            showGrid && (
              <CartesianGrid 
                key="grid"
                strokeDasharray="3 3" 
                stroke={themeColors.grid}
                opacity={0.3}
              />
            ),
            <XAxis 
              key="xaxis"
              dataKey={xAxisKey} 
              stroke={themeColors.text}
              fontSize="var(--text-xs)"
              tickLine={false}
              axisLine={false}
            />,
            <YAxis 
              key="yaxis"
              stroke={themeColors.text}
              fontSize="var(--text-xs)"
              tickLine={false}
              axisLine={false}
            />,
            showTooltip && <Tooltip key="tooltip" content={<CustomTooltip />} />,
            showLegend && (
              <Legend 
                key="legend"
                wrapperStyle={{ 
                  fontSize: 'var(--text-xs)',
                  color: themeColors.legend,
                }}
              />
            ),
            ...React.Children.toArray(children.props.children),
          ].filter(Boolean),
        })}
      </ResponsiveContainer>
    </div>
  );
};

// Line Chart Component
export const LineChart = ({ 
  data, 
  lines = [], 
  height = 300,
  curved = true,
  showDots = true,
  ...props 
}) => {
  const colors = getChartColors();
  
  // Auto-generate lines if not provided
  const chartLines = lines.length > 0 ? lines : 
    data.length > 0 ? Object.keys(data[0])
      .filter(key => key !== props.xAxisKey && key !== 'name')
      .map((key, index) => ({
        dataKey: key,
        name: key,
        color: colors[index % colors.length],
      })) : [];

  return (
    <BaseChart data={data} height={height} {...props}>
      <RechartsLineChart>
        {chartLines.map((line, index) => (
          <Line
            key={line.dataKey}
            type={curved ? "monotone" : "linear"}
            dataKey={line.dataKey}
            stroke={line.color || colors[index % colors.length]}
            strokeWidth={2}
            dot={showDots ? { r: 4 } : false}
            name={line.name || line.dataKey}
          />
        ))}
      </RechartsLineChart>
    </BaseChart>
  );
};

// Area Chart Component
export const AreaChart = ({ 
  data, 
  areas = [], 
  height = 300,
  curved = true,
  stacked = false,
  ...props 
}) => {
  const colors = getChartColors();
  
  // Auto-generate areas if not provided
  const chartAreas = areas.length > 0 ? areas : 
    data.length > 0 ? Object.keys(data[0])
      .filter(key => key !== props.xAxisKey && key !== 'name')
      .map((key, index) => ({
        dataKey: key,
        name: key,
        color: colors[index % colors.length],
      })) : [];

  return (
    <BaseChart data={data} height={height} {...props}>
      <RechartsAreaChart>
        {chartAreas.map((area, index) => (
          <Area
            key={area.dataKey}
            type={curved ? "monotone" : "linear"}
            dataKey={area.dataKey}
            stackId={stacked ? "1" : area.dataKey}
            stroke={area.color || colors[index % colors.length]}
            fill={area.color || colors[index % colors.length]}
            fillOpacity={0.6}
            name={area.name || area.dataKey}
          />
        ))}
      </RechartsAreaChart>
    </BaseChart>
  );
};

// Bar Chart Component
export const BarChart = ({ 
  data, 
  bars = [], 
  height = 300,
  horizontal = false,
  ...props 
}) => {
  const colors = getChartColors();
  
  // Auto-generate bars if not provided
  const chartBars = bars.length > 0 ? bars : 
    data.length > 0 ? Object.keys(data[0])
      .filter(key => key !== props.xAxisKey && key !== 'name')
      .map((key, index) => ({
        dataKey: key,
        name: key,
        color: colors[index % colors.length],
      })) : [];

  return (
    <BaseChart data={data} height={height} {...props}>
      <RechartsBarChart layout={horizontal ? 'horizontal' : 'vertical'}>
        {chartBars.map((bar, index) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            fill={bar.color || colors[index % colors.length]}
            name={bar.name || bar.dataKey}
            radius={[2, 2, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </BaseChart>
  );
};

// Pie Chart Component
export const PieChart = ({ 
  data, 
  height = 300,
  dataKey = 'value',
  nameKey = 'name',
  showLabels = true,
  innerRadius = 0,
  ...props 
}) => {
  const colors = getChartColors();
  const themeColors = getThemeColors();

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius="80%"
            dataKey={dataKey}
            nameKey={nameKey}
            label={showLabels ? { fontSize: 'var(--text-xs)' } : false}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </Pie>
          {props.showTooltip !== false && <Tooltip content={<CustomTooltip />} />}
          {props.showLegend !== false && (
            <Legend 
              wrapperStyle={{ 
                fontSize: 'var(--text-xs)',
                color: themeColors.legend,
              }}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

// PropTypes
const chartPropTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  height: PropTypes.number,
  responsive: PropTypes.bool,
  showGrid: PropTypes.bool,
  showTooltip: PropTypes.bool,
  showLegend: PropTypes.bool,
  xAxisKey: PropTypes.string,
};

LineChart.propTypes = {
  ...chartPropTypes,
  lines: PropTypes.arrayOf(PropTypes.shape({
    dataKey: PropTypes.string.isRequired,
    name: PropTypes.string,
    color: PropTypes.string,
  })),
  curved: PropTypes.bool,
  showDots: PropTypes.bool,
};

AreaChart.propTypes = {
  ...chartPropTypes,
  areas: PropTypes.arrayOf(PropTypes.shape({
    dataKey: PropTypes.string.isRequired,
    name: PropTypes.string,
    color: PropTypes.string,
  })),
  curved: PropTypes.bool,
  stacked: PropTypes.bool,
};

BarChart.propTypes = {
  ...chartPropTypes,
  bars: PropTypes.arrayOf(PropTypes.shape({
    dataKey: PropTypes.string.isRequired,
    name: PropTypes.string,
    color: PropTypes.string,
  })),
  horizontal: PropTypes.bool,
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  height: PropTypes.number,
  dataKey: PropTypes.string,
  nameKey: PropTypes.string,
  showLabels: PropTypes.bool,
  innerRadius: PropTypes.number,
  showTooltip: PropTypes.bool,
  showLegend: PropTypes.bool,
};

export default {
  LineChart,
  AreaChart,
  BarChart,
  PieChart,
};
