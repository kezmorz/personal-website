import { ListItem as MuiListItem, ListItemText } from "@mui/material";

const ListItem = ({ children, ...props }) => (
  <MuiListItem
    sx={{ display: "list-item", p: { xs: "4px 8px", sm: "8px 16px" } }}
    {...props}
  >
    <ListItemText>{children}</ListItemText>
  </MuiListItem>
);

export default ListItem;
