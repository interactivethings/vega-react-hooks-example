import * as React from "react";
import * as vega from "vega";

// Note the added prop "handleClick"
export const Chart = ({ spec, handleClick }) => {
  const chartContainer = React.useRef();
  React.useEffect(
    () => {
      const createView = async () => {
        try {
          const view = new vega.View(vega.parse(spec), {
            logLevel: vega.Warn,
            renderer: "svg",
            container: chartContainer.current,
            hover: true
          });

          // Wait for Vega's scenegraph to finish rendering
          const awaitedView = await view.runAsync();

          // Attach the handler to the signal defined
          // in Vega's chart spec.
          awaitedView.addSignalListener("clickOnCategory", handleClick);
        } catch (error) {
          console.log(error);
        }
      };

      createView();
    },

    // Notice the added dependency "handleClick"
    [spec, handleClick]
  );

  return <div ref={chartContainer} />;
};
