import * as React from "react";

export const ChartRenderer = () => {
  // useRef() is a hook that provide a way to manipulate
  // a DOM element imperatively.
  const chartContainer = React.useRef();

  // This component only returns the div
  // that will be used as the chart container.
  return <div ref={chartContainer} />;
};
