import { Button, styled } from "@mui/material";

export default styled(Button)`
  text-transform: none;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
`;
