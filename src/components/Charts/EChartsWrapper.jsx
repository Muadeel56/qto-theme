import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  RadarChart,
  MapChart,
  TreeChart,
  TreemapChart,
  GraphChart,
  GaugeChart,
  FunnelChart,
  ParallelChart,
  SankeyChart,
  BoxplotChart,
  CandlestickChart,
  EffectScatterChart,
  LinesChart,
  HeatmapChart,
  PictorialBarChart,
  ThemeRiverChart,
  SunburstChart,
} from 'echarts/charts';
import {
  GridComponent,
  PolarComponent,
  RadarComponent,
  GeoComponent,
  SingleAxisComponent,
  ParallelComponent,
  CalendarComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  TransformComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// Register required components
echarts.use([
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  RadarChart,
  MapChart,
  TreeChart,
  TreemapChart,
  GraphChart,
  GaugeChart,
  FunnelChart,
  ParallelChart,
  SankeyChart,
  BoxplotChart,
  CandlestickChart,
  EffectScatterChart,
  LinesChart,
  HeatmapChart,
  PictorialBarChart,
  ThemeRiverChart,
  SunburstChart,
  GridComponent,
  PolarComponent,
  RadarComponent,
  GeoComponent,
  SingleAxisComponent,
  ParallelComponent,
  CalendarComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  TransformComponent,
  CanvasRenderer,
]);

// Get theme colors from CSS custom properties
const getThemeColors = () => {
  const root = document.documentElement;
  const style = getComputedStyle(root);
  
  return {
    // Color palette
    colors: [
      style.getPropertyValue('--chart-color-1').trim() || '#f2b60f',
      style.getPropertyValue('--chart-color-2').trim() || '#22c55e',
      style.getPropertyValue('--chart-color-3').trim() || '#3b82f6',
      style.getPropertyValue('--chart-color-4').trim() || '#f59e0b',
      style.getPropertyValue('--chart-color-5').trim() || '#ef4444',
      style.getPropertyValue('--chart-color-6').trim() || '#8b5cf6',
      style.getPropertyValue('--chart-color-7').trim() || '#06b6d4',
      style.getPropertyValue('--chart-color-8').trim() || '#84cc16',
    ],
    // Theme colors
    backgroundColor: style.getPropertyValue('--chart-bg').trim() || '#ffffff',
    textColor: style.getPropertyValue('--chart-text').trim() || '#171717',
    axisColor: style.getPropertyValue('--chart-grid').trim() || '#e5e5e5',
    legendColor: style.getPropertyValue('--chart-legend').trim() || '#525252',
  };
};

// Create theme-aware default options
const createThemeOptions = (userOptions = {}) => {
  const themeColors = getThemeColors();
  
  const defaultOptions = {
    color: themeColors.colors,
    backgroundColor: themeColors.backgroundColor,
    textStyle: {
      color: themeColors.textColor,
      fontFamily: 'var(--font-base)',
    },
    title: {
      textStyle: {
        color: themeColors.textColor,
        fontFamily: 'var(--font-base)',
        fontWeight: 600,
      },
    },
    legend: {
      textStyle: {
        color: themeColors.legendColor,
        fontFamily: 'var(--font-base)',
        fontSize: 12,
      },
    },
    tooltip: {
      backgroundColor: themeColors.backgroundColor,
      borderColor: themeColors.axisColor,
      textStyle: {
        color: themeColors.textColor,
        fontFamily: 'var(--font-base)',
      },
    },
    grid: {
      borderColor: themeColors.axisColor,
      backgroundColor: 'transparent',
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: themeColors.axisColor,
        },
      },
      axisTick: {
        lineStyle: {
          color: themeColors.axisColor,
        },
      },
      axisLabel: {
        color: themeColors.textColor,
        fontFamily: 'var(--font-base)',
        fontSize: 11,
      },
      splitLine: {
        lineStyle: {
          color: themeColors.axisColor,
          opacity: 0.3,
        },
      },
    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: themeColors.axisColor,
        },
      },
      axisTick: {
        lineStyle: {
          color: themeColors.axisColor,
        },
      },
      axisLabel: {
        color: themeColors.textColor,
        fontFamily: 'var(--font-base)',
        fontSize: 11,
      },
      splitLine: {
        lineStyle: {
          color: themeColors.axisColor,
          opacity: 0.3,
        },
      },
    },
  };

  // Deep merge user options with theme defaults
  return mergeDeep(defaultOptions, userOptions);
};

// Deep merge utility function
const mergeDeep = (target, source) => {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          output[key] = source[key];
        else
          output[key] = mergeDeep(target[key], source[key]);
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
};

const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

// Main ECharts wrapper component
const EChartsWrapper = ({
  type = 'line',
  data = [],
  options = {},
  height = 300,
  width = '100%',
  responsive = true,
  theme = 'auto',
  className = '',
  style = {},
  onChartReady,
  onEvents = {},
  ...props
}) => {
  // Memoize the final options to avoid unnecessary re-renders
  const finalOptions = useMemo(() => {
    return createThemeOptions(options);
  }, [options]);

  const chartStyle = {
    width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  return (
    <div className={`qto-echarts-wrapper ${className}`} style={chartStyle}>
      <ReactEChartsCore
        echarts={echarts}
        option={finalOptions}
        style={{
          width: '100%',
          height: '100%',
        }}
        onChartReady={onChartReady}
        onEvents={onEvents}
        opts={{
          renderer: 'canvas',
          useDirtyRect: false,
        }}
        {...props}
      />
    </div>
  );
};

// Preset chart components for common use cases
export const EChartsLine = ({ data, xField = 'name', yField = 'value', ...props }) => {
  const options = {
    xAxis: {
      type: 'category',
      data: data.map(item => item[xField]),
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      data: data.map(item => item[yField]),
      type: 'line',
      smooth: true,
    }],
    ...props.options,
  };

  return <EChartsWrapper type="line" options={options} {...props} />;
};

export const EChartsBar = ({ data, xField = 'name', yField = 'value', ...props }) => {
  const options = {
    xAxis: {
      type: 'category',
      data: data.map(item => item[xField]),
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      data: data.map(item => item[yField]),
      type: 'bar',
    }],
    ...props.options,
  };

  return <EChartsWrapper type="bar" options={options} {...props} />;
};

export const EChartsPie = ({ data, nameField = 'name', valueField = 'value', ...props }) => {
  const options = {
    series: [{
      type: 'pie',
      data: data.map(item => ({
        name: item[nameField],
        value: item[valueField],
      })),
      radius: ['0%', '70%'],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    }],
    ...props.options,
  };

  return <EChartsWrapper type="pie" options={options} {...props} />;
};

// PropTypes
EChartsWrapper.propTypes = {
  /** Chart type */
  type: PropTypes.string,
  /** Chart data */
  data: PropTypes.array,
  /** ECharts options object */
  options: PropTypes.object,
  /** Chart height */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Chart width */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Whether chart is responsive */
  responsive: PropTypes.bool,
  /** Theme name */
  theme: PropTypes.string,
  /** Additional CSS class */
  className: PropTypes.string,
  /** Additional styles */
  style: PropTypes.object,
  /** Chart ready callback */
  onChartReady: PropTypes.func,
  /** Event handlers */
  onEvents: PropTypes.object,
};

EChartsLine.propTypes = {
  data: PropTypes.array.isRequired,
  xField: PropTypes.string,
  yField: PropTypes.string,
  options: PropTypes.object,
};

EChartsBar.propTypes = {
  data: PropTypes.array.isRequired,
  xField: PropTypes.string,
  yField: PropTypes.string,
  options: PropTypes.object,
};

EChartsPie.propTypes = {
  data: PropTypes.array.isRequired,
  nameField: PropTypes.string,
  valueField: PropTypes.string,
  options: PropTypes.object,
};

export default EChartsWrapper;
