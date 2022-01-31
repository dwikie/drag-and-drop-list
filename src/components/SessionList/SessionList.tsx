import {
  Delete,
  DragIndicator,
  DriveFileRenameOutline,
  ExpandMore,
  MoreHoriz,
} from "@mui/icons-material";
import {
  Box,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  Typography,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  ListItemText,
  InputBase,
} from "@mui/material";
import React from "react";
import { useEventCtx } from "../../contexts/EventCtx";
import { ISession } from "../../interfaces/ICurricullum";

interface SessionListProps extends ListItemButtonProps {
  session: ISession;
}

export default function SessionList({ session, ...rest }: SessionListProps) {
  const eventCtx = useEventCtx();
  const [editStateId, setEditStateId] = React.useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const sessionNameInputRef = React.useRef<HTMLInputElement>(null);

  const handleOpenMenu = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleUpdateSessionBlur = async (
    sessionId: string,
    sessionName: string
  ) => {
    try {
      await eventCtx.updateSessionName(sessionId, sessionName);
    } catch (err) {
      throw new Error(String(err));
    }
  };

  return (
    <ListItemButton {...rest} disableTouchRipple divider>
      <Box
        display="flex"
        alignItems="center"
        flex="1 1 0"
        justifyContent="space-between">
        <Box flex="1 1 0" display="inline-flex">
          <ListItemIcon onClick={(e) => e.stopPropagation()}>
            <DragIndicator fontSize="small" sx={{ alignSelf: "center" }} />
          </ListItemIcon>
          <Box display="flex" columnGap={2}>
            {editStateId === session.id ? (
              <InputBase
                defaultValue={session.name}
                inputProps={{
                  ref: sessionNameInputRef,
                }}
                sx={{
                  fontWeight: 500,
                  py: 0,
                  fontSize: ({ typography }) => typography.h6.fontSize,
                  width: "100%",
                  backgroundColor: "inherit",
                }}
                onFocus={(e) => e.stopPropagation()}
                onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
                onBlur={async function (e) {
                  await handleUpdateSessionBlur(session.id, e.target.value);
                  setEditStateId("");
                }}
              />
            ) : (
              <>
                <Typography variant="h6">{session.name}</Typography>
                <IconButton
                  color="default"
                  size="small"
                  disableTouchRipple
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setTimeout(() => {
                      if (sessionNameInputRef.current)
                        sessionNameInputRef.current.focus();
                    }, 100);
                    setEditStateId(session.id);
                  }}>
                  <DriveFileRenameOutline fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
        <Box>
          <IconButton
            color="default"
            aria-controls={Boolean(anchorEl) ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) ? "true" : undefined}
            onClick={handleOpenMenu}>
            <MoreHoriz fontSize="small" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            transformOrigin={{
              horizontal: "right",
              vertical: "center",
            }}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            PaperProps={{
              onClick: (e: React.SyntheticEvent) => e.stopPropagation(),
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}>
            <MenuItem onClick={handleCloseMenu}>
              <ListItemIcon>
                <ExpandMore fontSize="small" />
              </ListItemIcon>
              <ListItemText>Expand</ListItemText>
            </MenuItem>
            <Divider variant="middle" />
            <MenuItem onClick={handleCloseMenu}>
              <ListItemIcon>
                <DriveFileRenameOutline fontSize="small" />
              </ListItemIcon>
              <ListItemText>Update Session</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <ListItemIcon>
                <Delete fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete Session</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </ListItemButton>
  );
}
