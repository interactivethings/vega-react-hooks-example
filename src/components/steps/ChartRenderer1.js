import * as React from "react";

export const ChartRenderer = () => {
  // useRef() is a hook that provides a way to manipulate
  // a DOM node imperatively.
  const chartContainer = React.useRef(null);

  // This component only returns the div
  // that will later be used as the chart container.
  return <div ref={chartContainer} />;
};
