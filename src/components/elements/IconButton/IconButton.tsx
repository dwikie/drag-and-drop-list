import { IconButton, styled } from "@mui/material";

export default styled(IconButton)`
  color: ${({ theme, ...props }) =>
    props.color ? props.color : theme.palette.text.primary};
`;
