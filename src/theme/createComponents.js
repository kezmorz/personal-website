import cssBaseline from "./components/cssBaseline";
import paper from "./components/paper";
import appBar from "./components/appBar";
import buttonBase from "./components/buttonBase";
import button from "./components/button";
import link from "./components/link";
import divider from "./components/divider";

const createComponents = () => {
  const cssBaselineComponent = cssBaseline();
  const paperComponent = paper();
  const appBarComponent = appBar();
  const buttonBaseComponent = buttonBase();
  const buttonComponent = button();
  const linkComponent = link();
  const dividerComponent = divider();

  return {
    MuiCssBaseline: { ...cssBaselineComponent },
    MuiPaper: { ...paperComponent },
    MuiAppBar: { ...appBarComponent },
    MuiButtonBase: { ...buttonBaseComponent },
    MuiButton: { ...buttonComponent },
    MuiLink: { ...linkComponent },
    MuiDivider: { ...dividerComponent },
  };
};

export default createComponents;
