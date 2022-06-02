import { List } from "@mui/material";

const OrderedList = (props) => (
  <List
    component="ol"
    disablePadding
    sx={{ listStyle: "revert", paddingInlineStart: 4 }}
    {...props}
  />
);

export default OrderedList;
