import { List } from "@mui/material";

const UnorderedList = (props) => (
  <List
    disablePadding
    sx={{ listStyle: "revert", paddingInlineStart: 4 }}
    {...props}
  />
);

export default UnorderedList;
