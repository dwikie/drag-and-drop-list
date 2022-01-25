import { Box } from "@mui/material";
import React from "react";
import { CurricullumDetail } from "..";

export default function EventTabsContent() {
  return (
    <Box display="flex" flexDirection="column" rowGap={3}>
      <CurricullumDetail />
    </Box>
  );
}
