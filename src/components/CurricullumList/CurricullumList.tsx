import {
  Add,
  DragIndicator,
  DriveFileRenameOutline,
  MoreHoriz,
  MoreVert,
  PlaceOutlined,
  VideocamOutlined,
} from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Collapse,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputBase,
  InputProps,
  List,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemProps,
  Radio,
  RadioGroup,
  styled,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useEventCtx } from "../../contexts/EventCtx";
import { ILesson, ISession } from "../../interfaces/ICurricullum";
import { Button, IconButton } from "../elements";
import { LocalizationProvider, DatePicker, DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

interface ILessonListItem extends ListItemProps {
  lesson: ILesson;
}

interface ISessionListItem extends ListItemButtonProps {
  session: ISession;
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
  sessions: ISession[];
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
  const [drawerSession, setDrawerSession] = React.useState<string>("");

  const handleBlurEditSessionName = () => {
    setEditingSessionId("");
    setSessionButtonDisabled(false);
  };
  return (
    <>
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
              <Box component="div">
                <Collapse
                  in={session.id === collapsedId ? true : false}
                  timeout="auto"
                  unmountOnExit>
                  <Box
                    sx={{
                      boxShadow: `0 0 4px 1px inset #00000037`,
                    }}>
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
                  </Box>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{ minWidth: "unset", margin: "1rem 2.5rem" }}
                    disableFocusRipple
                    onClick={() => setDrawerSession(session.id)}>
                    <Add fontSize="small" />
                  </Button>
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
      <Drawer
        anchor="bottom"
        open={Boolean(drawerSession)}
        onBackdropClick={() => setDrawerSession("")}
        PaperProps={{
          sx: { height: "80vh", padding: "2rem 1rem", rowGap: "1.25rem" },
        }}>
        <Typography variant="h3">
          Add Lesson - {sessions.find((x) => x.id === drawerSession)?.name}
        </Typography>
        <Formik initialValues={{ test: "" }} onSubmit={() => {}}>
          <Form>
            <FormControl>
              <TextField label="Lesson Name" variant="outlined" />
            </FormControl>
            <div>
              <FormControlLabel
                control={<Checkbox name="required" />}
                label="Required"
              />
              <FormControlLabel
                control={<Checkbox name="previewable" />}
                label="Previewable"
              />
            </div>
          </Form>
        </Formik>
      </Drawer>
    </>
  );
}
