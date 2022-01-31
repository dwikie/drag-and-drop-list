import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { EventTabs, Header, Title } from "../components";
import { Curricullum } from "../containers";

export default function Index() {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  return (
    <Box component="main" display="flex" flexDirection="column">
      <Header />
      <Container sx={{ paddingY: 3 }}>
        <Grid gap={4} display="flex" flexDirection="column">
          <Title />
          <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <Curricullum />
        </Grid>
      </Container>
    </Box>
  );
}
