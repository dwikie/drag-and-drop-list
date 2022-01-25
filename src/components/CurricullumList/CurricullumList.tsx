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
  List,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemProps,
  styled,
  Typography,
} from "@mui/material";
import { IEventLesson } from "../../interfaces/IEventLesson";
import { IEventSession } from "../../interfaces/IEventSession";
import { IconButton } from "../elements";

interface ILessonListItem extends ListItemProps {
  lesson: IEventLesson;
}

interface ISessionListItem extends ListItemButtonProps {
  session: IEventSession;
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

const SessionListItem = styled(({ session, ...props }: ISessionListItem) => (
  <ListItemButton {...props} disableTouchRipple>
    <ListItemIcon>
      <DragIndicator fontSize="small" />
    </ListItemIcon>
    <Box
      display="flex"
      alignItems="center"
      flex="1 1 0"
      justifyContent="space-between">
      <Box>
        <Typography
          display="inline-block"
          sx={{ verticalAlign: "text-top" }}
          variant="h5"
          marginRight=".5rem"
          color={({ palette }) => palette.text.primary}>
          {session.name}
        </Typography>
        <IconButton color="default" size="small" disableTouchRipple>
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
))``;

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
  return (
    <List component="div" {...props}>
      {sessions && sessions.length > 0 ? (
        sessions.map((session) => (
          <Box component="div" key={session.id}>
            <SessionListItem
              id={session.id}
              session={session}
              onClick={onSessionListItemClick}
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
