import { Box, styled, Typography } from "@mui/material";
import { useEventCtx } from "../../contexts/EventCtx";
import React from "react";
import { IEventSession } from "../../interfaces/IEventSession";

import CurricullumList from "../CurricullumList";

const BorderBox = styled(Box)`
  border: 1.75px solid ${({ theme }) => theme.palette.grey["300"]};
  border-radius: 8px;
`;

export default function CurricullumDetail() {
  const EventCtx = useEventCtx();
  const [sessions, setSessions] = React.useState<IEventSession[] | []>([]);
  const [collapsedId, setCollapsedId] = React.useState<string | null>(null);

  const handleExpandSession = (e: React.SyntheticEvent) => {
    const currentId = e.currentTarget.id;
    setCollapsedId((id) => (id === currentId ? null : currentId));
  };

  React.useEffect(() => {
    setSessions(EventCtx.sessions);
  }, [EventCtx.sessions]);

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
    </>
  );
}
