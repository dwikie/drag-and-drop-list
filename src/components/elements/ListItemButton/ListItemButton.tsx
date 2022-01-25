import {
  ListItemButton,
  ListItemButtonProps,
  styled,
  ListItemIcon,
} from "@mui/material";

export interface IListItemProps extends ListItemButtonProps {
  content?: React.ReactNode;
  startIcon?: React.ReactNode;
}

export default styled(({ content, startIcon, ...props }: IListItemProps) => (
  <ListItemButton {...props}>
    {startIcon && <ListItemIcon>{startIcon}</ListItemIcon>}
    {content}
  </ListItemButton>
))`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey["200"]};
`;
