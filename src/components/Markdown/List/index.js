import { List as MuiList } from "@mui/material";
import { styled } from "@mui/material/styles";

const ListRoot = styled(MuiList)(({ theme }) => ({
  listStyleType: "auto",
  paddingInlineStart: 32,
}));

const List = (props) => <ListRoot disablePadding {...props} />;

export default List;
