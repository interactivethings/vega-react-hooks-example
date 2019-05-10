import * as React from "react";

// Don't forget to import the module vega!
import * as vega from "vega";

// Note the new props "specs"
export const ChartRenderer = ({ spec }) => {
  const chartContainer = React.useRef();

  // This is the hook that will be called after
  // the first rendering, and everytime "spec" updates.
  React.useEffect(
    () => {
      const createView = async () => {
        try {
          // The View methods constructs an instance of the Vega dataflow graph
          const view = new vega.View(
            // The first argument is the vega specs,
            // We need to convert the JavaScript object into JSON
            // using vega.parse().
            vega.parse(spec),
            // The second argument is an object of options to
            // configure the View instance.
            {
              logLevel: vega.Warn, // This is useful to see potential errors in the console.
              renderer: "svg", // The default is "canvas".
              // This is where we define the object returned
              // by useRef() as the chart container.
              container: chartContainer.current,
              hover: true
            }
          );
          // The is where we actually render the View within our container.
          await view.runAsync();
        } catch (error) {
          console.log(error);
        }
      };

      // Here we call the async function to initiate the View.
      createView();
    },
    // We pass "spec" as the second argument of useEffect()
    // to tell React which value the effect depends on.
    // This prevent React from firing the effect after
    // every render, but only if the spec changes.
    [spec]
  );

  return <div ref={chartContainer} />;
};
