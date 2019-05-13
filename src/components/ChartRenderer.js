import * as React from "react";
import * as vega from "vega";

export const ChartRenderer = ({ spec, handleClick }) => {
  const chartContainer = React.useRef(null);
  React.useEffect(() => {
    const createView = async () => {
      try {
        const view = new vega.View(vega.parse(spec), {
          logLevel: vega.Warn,
          renderer: "svg",
          container: chartContainer.current,
          hover: true
        });

        const awaitedView = await view.runAsync();
        awaitedView.addSignalListener("clickOnCategory", handleClick);
      } catch (error) {
        console.error(error);
      }
    };

    createView();
  }, [spec, handleClick]);

  return <div ref={chartContainer} />;
};
