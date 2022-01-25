import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { EventTabs, EventTabsContent, Header, Title } from "../components";
import { useEventCtx } from "../contexts/EventCtx";

export default function Index() {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const evt = useEventCtx();
  React.useEffect(() => {
    evt.addLesson("985f1128-078e-42f3-859a-ff65d959c494", {
      duration: 120,
      name: "Lesson",
      previewable: true,
      required: true,
      schedule: new Date(),
      type: "online",
    });
    // evt.addLesson("efa25688-88f8-4502-8724-b8d11af1496c", {
    //   duration: 120,
    //   name: "asdads",
    //   previewable: true,
    //   required: true,
    //   schedule: new Date(),
    //   type: "online",
    // });
  }, []);
  return (
    <Box component="main" display="flex" flexDirection="column">
      <Header />
      <Container sx={{ paddingY: 3 }}>
        <Grid gap={4} display="flex" flexDirection="column">
          <Title />
          <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <EventTabsContent />
        </Grid>
      </Container>
    </Box>
  );
}
