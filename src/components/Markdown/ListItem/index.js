import { ListItem as MuiListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";

const ListItemRoot = styled(MuiListItem)(({ theme }) => ({
  display: "list-item",
  padding: "4px 8px",
  [theme.breakpoints.up("sm")]: {
    padding: "8px 16px",
  },
}));

const ListItem = ({ children, ...props }) => (
  <ListItemRoot {...props}>
    <ListItemText primary={children} />
  </ListItemRoot>
);

export default ListItem;
