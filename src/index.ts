import type {
  HyperFunctionComponent,
  HfcProps,
} from "hyper-function-component";

import "./index.css";

const HFC: HyperFunctionComponent = (container, initProps) => {
  const input = document.createElement("input");
  input.type = "checkbox";
  const div = document.createElement("div");
  container.appendChild(input);
  container.appendChild(div);

  const defaultChecked = initProps.attrs.defaultChecked;
  if (typeof defaultChecked !== "undefined") {
    input.checked = defaultChecked;
  }

  function render(props: HfcProps) {
    const checked = props.attrs.checked;
    const controlled = typeof checked === "boolean";

    if (controlled) input.checked = checked;

    input.onchange = function (e) {
      let _checked = (e.target as HTMLInputElement).checked;
      if (controlled) {
        input.checked = checked;
        _checked = !checked;
      }

      props.events.onChange?.({
        event: e,
        checked: _checked,
      });
    };

    if (props.attrs.name) {
      input.name = props.attrs.name;
    }

    if (props.attrs.size) {
      container.style.fontSize = props.attrs.size + "px";
    }
  }

  render(initProps);

  return {
    changed(props) {
      render(props);
    },
    disconnected() {},
  };
};

HFC.tag = "label";
// @ts-ignore
HFC.hfc = process.env.HFC_NAME;
// @ts-ignore
HFC.ver = process.env.HFC_VERSION;
// @ts-ignore
HFC.names = process.env.HFC_PROP_NAMES;

export default HFC;
