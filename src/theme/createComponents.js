import cssBaseline from "./components/cssBaseline";
import appBar from "./components/appBar";
import buttonBase from "./components/buttonBase";
import button from "./components/button";
import link from "./components/link";

const createComponents = () => {
  const cssBaselineComponent = cssBaseline();
  const appBarComponent = appBar();
  const buttonBaseComponent = buttonBase();
  const buttonComponent = button();
  const linkComponent = link();

  return {
    MuiCssBaseline: { ...cssBaselineComponent },
    MuiAppBar: { ...appBarComponent },
    MuiButtonBase: { ...buttonBaseComponent },
    MuiButton: { ...buttonComponent },
    MuiLink: { ...linkComponent },
  };
};

export default createComponents;
