import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  List,
  styled,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React from "react";
import { SessionList, LessonList, FormSession } from "../../components";
import { useEventCtx } from "../../contexts/EventCtx";
import { ILesson, ISession } from "../../interfaces/ICurricullum";

const BorderBox = styled(Box)`
  border: 1.75px solid ${({ theme }) => theme.palette.grey["300"]};
  border-radius: 8px;
  padding: 1rem;
`;

export default function Curricullum() {
  const eventCtx = useEventCtx();
  const [sessions, setSessions] = React.useState<ISession[] | []>(
    eventCtx.sessions
  );
  const [sessionExpandId, setSessionExpandId] = React.useState<string>("");
  const [selectedSession, setSelectedSession] = React.useState<ISession | null>(
    null
  );
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  const handleAddNewSession = async () => {
    try {
      await eventCtx.addSession("New Session");
      setSessions(eventCtx.sessions);
    } catch (err) {
      throw new Error(String(err));
    }
  };

  const handleLessonExpand = (sessionId: string) => {
    if (sessionExpandId === sessionId) {
      setSessionExpandId("");
      return;
    }
    setSessionExpandId(sessionId);
  };

  const handleOpenDrawer = (session: ISession) => {
    setSelectedSession(session);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = (e: React.SyntheticEvent) => {
    e.target.addEventListener(
      "transitionend",
      () => {
        setSelectedSession(null);
      },
      { once: true }
    );
    setDrawerOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" rowGap={3}>
      <BorderBox>
        <Typography variant="body1">
          Event Schedule:{" "}
          {new Intl.DateTimeFormat("id-ID", {
            dateStyle: "long",
            timeStyle: "short",
          }).format(new Date())}
        </Typography>
      </BorderBox>
      <BorderBox>
        {sessions && sessions.length > 0 ? (
          <List component="div">
            {sessions.map((session) => (
              <Box key={session.id}>
                <SessionList
                  session={session}
                  onClick={() => handleLessonExpand(session.id)}
                />
                <Collapse
                  sx={{ paddingY: 1 }}
                  in={sessionExpandId === session.id ? true : false}
                  unmountOnExit>
                  <List>
                    {session.lessons && session.lessons.length > 0 ? (
                      session.lessons.map((lesson) => (
                        <LessonList key={lesson.id} lesson={lesson} />
                      ))
                    ) : (
                      <Typography variant="body1" textAlign="center">
                        Lesson's empty
                      </Typography>
                    )}
                  </List>
                  <Button
                    variant="contained"
                    onClick={handleOpenDrawer.bind(null, session)}
                    size="small"
                    sx={{ minWidth: "unset", width: "40px", height: "30px" }}>
                    <Add fontSize="small" />
                  </Button>
                </Collapse>
              </Box>
            ))}
          </List>
        ) : (
          <Typography variant="body1" textAlign="center">
            Session's empty
          </Typography>
        )}
      </BorderBox>
      <Box justifyContent="flex-end" display="flex">
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddNewSession}>
          Add Session
        </Button>
      </Box>
      <SwipeableDrawer
        anchor="bottom"
        open={Boolean(drawerOpen)}
        onOpen={() => handleOpenDrawer(selectedSession!)}
        onClose={handleCloseDrawer}
        PaperProps={{ sx: { padding: "2rem 1rem" } }}>
        {selectedSession && (
          <FormSession
            sessionId={selectedSession.id}
            closeDrawer={() => setDrawerOpen(false)}
          />
        )}
      </SwipeableDrawer>
    </Box>
  );
}
