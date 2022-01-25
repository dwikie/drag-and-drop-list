import {
  DragIndicator,
  DriveFileRenameOutline,
  MoreHoriz,
  MoreVert,
  PlaceOutlined,
  VideocamOutlined,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemProps,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { useEventCtx } from "../../contexts/EventCtx";
import { IEventLesson } from "../../interfaces/IEventLesson";
import { IEventSession } from "../../interfaces/IEventSession";
import { IconButton } from "../elements";

interface ILessonListItem extends ListItemProps {
  lesson: IEventLesson;
}

interface ISessionListItem extends ListItemButtonProps {
  session: IEventSession;
  handleBlurEditSessionName: () => void;
  handleEditSessionName: (e: React.SyntheticEvent) => void;
  handleUpdateSessionName: (
    sessionId: string,
    sessionName: string
  ) => Promise<void>;
  editingSessionId: string;
}

const LessonListItem = styled(({ lesson, ...props }: ILessonListItem) => (
  <ListItem {...props}>
    <ListItemIcon>
      <DragIndicator fontSize="small" />
    </ListItemIcon>
    <Box
      display="flex"
      alignItems="center"
      flex="1 1 0"
      justifyContent="space-between"
      fontSize=".8775em">
      <Box
        flexWrap="wrap"
        fontSize="inherit"
        display="flex"
        alignItems="center"
        columnGap=".75rem">
        {lesson.type === "online" ? (
          <VideocamOutlined fontSize="small" />
        ) : (
          <PlaceOutlined fontSize="small" />
        )}
        <Typography
          display="inline-block"
          sx={{ verticalAlign: "text-top" }}
          variant="inherit"
          fontSize="inherit"
          fontWeight="500"
          color={({ palette }) => palette.text.primary}>
          {lesson.name}
        </Typography>
        {lesson.required && (
          <Typography
            display="inline-block"
            sx={{ verticalAlign: "text-top" }}
            variant="inherit"
            fontSize="inherit"
            fontWeight="500"
            color={({ palette }) => palette.primary.main}>
            Required
          </Typography>
        )}
        {lesson.previewable && (
          <Typography
            display="inline-block"
            sx={{ verticalAlign: "text-top" }}
            variant="inherit"
            fontSize="inherit"
            fontWeight="500"
            color={({ palette }) => palette.action.active}>
            Previewable
          </Typography>
        )}
      </Box>
      <Box fontSize="inherit">
        <IconButton color="default">
          <MoreVert fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  </ListItem>
))`
  padding-left: 2.5rem;
`;

const SessionListItem = styled(
  ({
    session,
    handleEditSessionName,
    editingSessionId,
    handleUpdateSessionName,
    handleBlurEditSessionName,
    ...props
  }: ISessionListItem) => (
    <ListItemButton {...props} disableTouchRipple>
      <ListItemIcon>
        <DragIndicator fontSize="small" />
      </ListItemIcon>
      <Box
        display="flex"
        alignItems="center"
        flex="1 1 0"
        justifyContent="space-between">
        <Box flex="1 1 0">
          {editingSessionId === session.id ? (
            <InputBase
              defaultValue={session.name}
              sx={{
                fontWeight: 500,
                py: 0,
                fontSize: "1.27em",
                width: "100%",
                backgroundColor: "inherit",
              }}
              onClick={(e) => e.stopPropagation()}
              onBlur={async (e) => {
                e.stopPropagation();
                await handleUpdateSessionName(
                  session.id,
                  e.currentTarget.value.trim()
                );
                handleBlurEditSessionName();
                return;
              }}
            />
          ) : (
            <Typography
              display="inline-block"
              sx={{ verticalAlign: "text-top" }}
              variant="h5"
              marginRight=".5rem"
              color={({ palette }) => palette.text.primary}>
              {session.name}
            </Typography>
          )}
          <IconButton
            sx={{
              display:
                editingSessionId === session.id ? "none" : "inline-block",
            }}
            color="default"
            size="small"
            onClick={handleEditSessionName}
            disableTouchRipple>
            <DriveFileRenameOutline fontSize="small" />
          </IconButton>
        </Box>
        <Box>
          <IconButton color="default" onClick={(e) => e.stopPropagation()}>
            <MoreHoriz fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </ListItemButton>
  )
)``;

export default function CurricullumList({
  sessions,
  onSessionListItemClick,
  collapsedId,
  ...props
}: {
  sessions: IEventSession[];
  onSessionListItemClick: (e: React.SyntheticEvent) => void;
  collapsedId: string | null;
}) {
  const eventCtx = useEventCtx();
  const [editingSessionId, setEditingSessionId] = React.useState<string>("");
  const handleEditSessionName = (sessionId: string) => {
    setEditingSessionId(sessionId);
  };
  const [isSessionButtonDisabled, setSessionButtonDisabled] =
    React.useState<boolean>(false);

  const handleBlurEditSessionName = () => {
    setEditingSessionId("");
    setSessionButtonDisabled(false);
  };
  return (
    <List component="div" {...props}>
      {sessions && sessions.length > 0 ? (
        sessions.map((session) => (
          <Box component="div" key={session.id}>
            <SessionListItem
              style={{
                pointerEvents: isSessionButtonDisabled ? "none" : "auto",
                backgroundColor: "inherit",
              }}
              id={session.id}
              session={session}
              handleUpdateSessionName={eventCtx.updateSessionName}
              onClick={(e) => {
                onSessionListItemClick(e);
              }}
              handleEditSessionName={(e) => {
                e.stopPropagation();
                setSessionButtonDisabled(true);
                const target = e.currentTarget;
                handleEditSessionName(
                  target.closest(".MuiListItemButton-root")?.id || ""
                );
                setTimeout(() => {
                  (
                    target.parentElement?.querySelector(
                      ".MuiInputBase-input"
                    ) as HTMLInputElement
                  ).focus();
                }, 100);
              }}
              handleBlurEditSessionName={handleBlurEditSessionName}
              editingSessionId={editingSessionId}
            />
            <Box
              component="div"
              sx={{
                boxShadow: `0 0 4px 1px inset #00000037`,
              }}>
              <Collapse
                in={session.id === collapsedId ? true : false}
                timeout="auto"
                unmountOnExit>
                {session.lessons && session.lessons.length > 0 ? (
                  session.lessons.map((lesson) => (
                    <LessonListItem key={lesson.id} lesson={lesson} />
                  ))
                ) : (
                  <Typography
                    variant="caption"
                    fontWeight="300"
                    align="center"
                    component="div"
                    paddingY=".5rem"
                    color={({ palette }) => palette.action.active}>
                    Lesson's empty
                  </Typography>
                )}
              </Collapse>
            </Box>
          </Box>
        ))
      ) : (
        <Typography
          variant="caption"
          fontWeight="300"
          align="center"
          component="div"
          paddingY=".5rem"
          color={({ palette }) => palette.action.active}>
          Session's empty
        </Typography>
      )}
    </List>
  );
}
