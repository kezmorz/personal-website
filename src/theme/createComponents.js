import cssBaseline from "./components/cssBaseline";
import appBar from "./components/appBar";
import buttonBase from "./components/buttonBase";
import button from "./components/button";

const createComponents = () => {
  const cssBaselineComponent = cssBaseline();
  const appBarComponent = appBar();
  const buttonBaseComponent = buttonBase();
  const buttonComponent = button();

  return {
    // MuiCssBaseline: {
    //   ...cssBaselineComponent,
    // },
    MuiAppBar: {
      ...appBarComponent,
    },
    // MuiButtonBase: {
    //   ...buttonBaseComponent,
    // },
    // MuiButton: {
    //   ...buttonComponent,
    // },
  };
};

export default createComponents;
