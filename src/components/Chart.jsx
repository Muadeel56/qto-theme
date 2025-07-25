import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/chart.css';

const Chart = ({
  type = 'line',
  data = [],
  options = {},
  width = 400,
  height = 300,
  title,
  showLegend = true,
  showGrid = true,
  showAxes = true,
  colors = ['#f2b60f', '#808080', '#22c55e', '#ef4444', '#3b82f6'],
  className = '',
  ...props
}) => {
  const canvasRef = useRef(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.length) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas size
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Chart padding
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Draw based on chart type
    switch (type) {
      case 'line':
        drawLineChart(ctx, data, chartWidth, chartHeight, padding);
        break;
      case 'bar':
        drawBarChart(ctx, data, chartWidth, chartHeight, padding);
        break;
      case 'pie':
        drawPieChart(ctx, data, chartWidth, chartHeight, padding);
        break;
      case 'doughnut':
        drawDoughnutChart(ctx, data, chartWidth, chartHeight, padding);
        break;
      default:
        drawLineChart(ctx, data, chartWidth, chartHeight, padding);
    }

    // Draw grid if enabled
    if (showGrid && ['line', 'bar'].includes(type)) {
      drawGrid(ctx, chartWidth, chartHeight, padding);
    }

    // Draw axes if enabled
    if (showAxes && ['line', 'bar'].includes(type)) {
      drawAxes(ctx, data, chartWidth, chartHeight, padding);
    }

  }, [data, type, width, height, showGrid, showAxes, colors]);

  const drawLineChart = (ctx, data, chartWidth, chartHeight, padding) => {
    if (!data.length) return;

    const points = data.map((item, index) => ({
      x: padding + (index / (data.length - 1)) * chartWidth,
      y: padding + chartHeight - (item.value / getMaxValue(data)) * chartHeight,
      value: item.value,
      label: item.label
    }));

    // Draw line
    ctx.strokeStyle = colors[0];
    ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();

    // Draw points
    points.forEach((point) => {
      ctx.fillStyle = colors[0];
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const drawBarChart = (ctx, data, chartWidth, chartHeight, padding) => {
    if (!data.length) return;

    const barWidth = chartWidth / data.length * 0.8;
    const barSpacing = chartWidth / data.length * 0.2;
    const maxValue = getMaxValue(data);

    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * chartHeight;
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = padding + chartHeight - barHeight;

      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(x, y, barWidth, barHeight);
    });
  };

  const drawPieChart = (ctx, data, chartWidth, chartHeight, padding) => {
    if (!data.length) return;

    const centerX = padding + chartWidth / 2;
    const centerY = padding + chartHeight / 2;
    const radius = Math.min(chartWidth, chartHeight) / 2 - 20;
    const total = data.reduce((sum, item) => sum + item.value, 0);

    let startAngle = -Math.PI / 2;

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;

      ctx.fillStyle = colors[index % colors.length];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      startAngle += sliceAngle;
    });
  };

  const drawDoughnutChart = (ctx, data, chartWidth, chartHeight, padding) => {
    if (!data.length) return;

    const centerX = padding + chartWidth / 2;
    const centerY = padding + chartHeight / 2;
    const outerRadius = Math.min(chartWidth, chartHeight) / 2 - 20;
    const innerRadius = outerRadius * 0.5;
    const total = data.reduce((sum, item) => sum + item.value, 0);

    let startAngle = -Math.PI / 2;

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;

      ctx.fillStyle = colors[index % colors.length];
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      ctx.fill();

      startAngle += sliceAngle;
    });
  };

  const drawGrid = (ctx, chartWidth, chartHeight, padding) => {
    const gridLines = 5;
    
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (i / gridLines) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= gridLines; i++) {
      const x = padding + (i / gridLines) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + chartHeight);
      ctx.stroke();
    }
  };

  const drawAxes = (ctx, data, chartWidth, chartHeight, padding) => {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.stroke();

    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding + chartHeight);
    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    // X-axis labels
    data.forEach((item, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      ctx.fillText(item.label || index, x, padding + chartHeight + 20);
    });

    // Y-axis labels
    const maxValue = getMaxValue(data);
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      const value = (maxValue / steps) * i;
      const y = padding + chartHeight - (i / steps) * chartHeight;
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(value), padding - 10, y + 4);
    }
  };

  const getMaxValue = (data) => {
    return Math.max(...data.map(item => item.value));
  };

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Simple tooltip logic for line/bar charts
    if (['line', 'bar'].includes(type)) {
      const padding = 60;
      const chartWidth = width - padding * 2;
      const dataIndex = Math.round(((x - padding) / chartWidth) * (data.length - 1));
      
      if (dataIndex >= 0 && dataIndex < data.length) {
        setTooltip({
          show: true,
          x: event.clientX,
          y: event.clientY,
          content: `${data[dataIndex].label}: ${data[dataIndex].value}`
        });
      } else {
        setTooltip({ show: false, x: 0, y: 0, content: '' });
      }
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, content: '' });
  };

  return (
    <div className={`qto-chart ${className}`} {...props}>
      {title && <h3 className="qto-chart__title">{title}</h3>}
      
      <div className="qto-chart__container">
        <canvas
          ref={canvasRef}
          className="qto-chart__canvas"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        
        {tooltip.show && (
          <div
            className="qto-chart__tooltip"
            style={{
              left: tooltip.x + 10,
              top: tooltip.y - 10,
              position: 'fixed',
              zIndex: 1000
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>

      {showLegend && (
        <div className="qto-chart__legend">
          {data.map((item, index) => (
            <div key={index} className="qto-chart__legend-item">
              <div
                className="qto-chart__legend-color"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="qto-chart__legend-label">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Chart.propTypes = {
  type: PropTypes.oneOf(['line', 'bar', 'pie', 'doughnut']),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  options: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  showLegend: PropTypes.bool,
  showGrid: PropTypes.bool,
  showAxes: PropTypes.bool,
  colors: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

export default Chart;
