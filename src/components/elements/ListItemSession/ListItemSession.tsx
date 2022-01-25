import {
  Box,
  ListItemButton,
  ListItemButtonProps,
  styled,
  Typography,
  IconButton,
} from "@mui/material";
import {
  DragIndicator,
  DriveFileRenameOutline,
  MoreHoriz,
} from "@mui/icons-material";

interface IListItemSession extends ListItemButtonProps {
  sessionTitle: string;
}

export default styled(({ sessionTitle, ...props }: IListItemSession) => (
  <ListItemButton {...props} disableTouchRipple>
    <Box
      color={({ palette }) => palette.action.active}
      display="flex"
      columnGap={1}
      alignItems="center">
      <DragIndicator />
      <Typography
        variant="subtitle1"
        fontWeight={500}
        color={({ palette }) => palette.text.primary}>
        {sessionTitle}
      </Typography>
      <DriveFileRenameOutline />
    </Box>
    <IconButton>
      <MoreHoriz />
    </IconButton>
  </ListItemButton>
))`
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey["200"]};
`;
