import * as React from "react";
import { ChartRenderer } from "./ChartRenderer3";

export const Bars = () => {
  const [highlight, updateHighlight] = React.useState("A");

  // these specs are copy/pasted from the Bar Chart example
  // from the Vega Documentation
  // https://vega.github.io/vega/examples/bar-chart/
  const spec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    width: 400,
    height: 200,
    padding: 5,

    data: [
      {
        name: "table",
        values: [
          { category: "A", amount: 28 },
          { category: "B", amount: 55 },
          { category: "C", amount: 43 },
          { category: "D", amount: 91 },
          { category: "E", amount: 81 },
          { category: "F", amount: 53 },
          { category: "G", amount: 19 },
          { category: "H", amount: 87 }
        ]
      }
    ],

    signals: [
      {
        name: "tooltip",
        value: {},
        on: [
          { events: "rect:mouseover", update: "datum" },
          { events: "rect:mouseout", update: "{}" }
        ]
      },
      {
        name: "clickOnCategory",
        on: [{ events: "rect:click", update: "datum" }]
      }
    ],

    scales: [
      {
        name: "xscale",
        type: "band",
        domain: { data: "table", field: "category" },
        range: "width",
        padding: 0.05,
        round: true
      },
      {
        name: "yscale",
        domain: { data: "table", field: "amount" },
        nice: true,
        range: "height"
      }
    ],

    axes: [
      { orient: "bottom", scale: "xscale" },
      { orient: "left", scale: "yscale" }
    ],

    marks: [
      {
        type: "rect",
        from: { data: "table" },
        encode: {
          enter: {
            x: { scale: "xscale", field: "category" },
            width: { scale: "xscale", band: 1 },
            y: { scale: "yscale", field: "amount" },
            y2: { scale: "yscale", value: 0 }
          },
          update: {
            fill: [
              {
                test: `datum.category === "${highlight}"`,
                value: "lightblue"
              },
              { value: "lightgrey" }
            ]
          },
          hover: {
            fill: { value: "lightblue" }
          }
        }
      },
      {
        type: "text",
        encode: {
          enter: {
            align: { value: "center" },
            baseline: { value: "bottom" },
            fill: { value: "#333" }
          },
          update: {
            x: { scale: "xscale", signal: "tooltip.category", band: 0.5 },
            y: { scale: "yscale", signal: "tooltip.amount", offset: -2 },
            text: { signal: "tooltip.amount" },
            fillOpacity: [{ test: "datum === tooltip", value: 0 }, { value: 1 }]
          }
        }
      }
    ]
  };

  const handleClick = (...args) => updateHighlight(args[1].category);

  return <ChartRenderer spec={spec} handleClick={handleClick} />;
};
