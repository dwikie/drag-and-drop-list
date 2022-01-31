import { Box, styled, Typography } from "@mui/material";
import { useEventCtx } from "../../contexts/EventCtx";
import React from "react";
import { ISession } from "../../interfaces/ICurricullum";

import CurricullumList from "../CurricullumList";
import { Button } from "../elements";
import { Add } from "@mui/icons-material";

const BorderBox = styled(Box)`
  border: 1.75px solid ${({ theme }) => theme.palette.grey["300"]};
  border-radius: 8px;
`;

export default function CurricullumDetail() {
  const EventCtx = useEventCtx();
  const [sessions, setSessions] = React.useState<ISession[] | []>(
    EventCtx.sessions
  );
  const [collapsedId, setCollapsedId] = React.useState<string | null>(null);

  const handleExpandSession = (e: React.SyntheticEvent) => {
    const currentId = e.currentTarget.id;
    setCollapsedId((id) => (id === currentId ? null : currentId));
  };

  const handleAddSession = async () => {
    try {
      const newSession = await EventCtx.addSession("New Session");
      setSessions((sessions) => [...sessions, newSession]);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <BorderBox padding="1rem">
        <Typography variant="body1">
          Event Schedule:{" "}
          {new Intl.DateTimeFormat("id-ID", {
            dateStyle: "long",
            timeStyle: "short",
          }).format(new Date())}
        </Typography>
      </BorderBox>
      <BorderBox padding="0">
        <CurricullumList
          sessions={sessions}
          onSessionListItemClick={handleExpandSession}
          collapsedId={collapsedId}
        />
      </BorderBox>
      <Box justifyContent="flex-end" display="flex">
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddSession}>
          Add Session
        </Button>
      </Box>
    </>
  );
}
