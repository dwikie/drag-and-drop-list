import { Add } from "@mui/icons-material";
import { Box } from "@mui/material";
import { CurricullumDetail } from "..";
import { Button } from "../elements";

export default function EventTabsContent() {
  return (
    <Box display="flex" flexDirection="column" rowGap={3}>
      <CurricullumDetail />
      <Box justifyContent="flex-end" display="flex">
        <Button variant="contained" startIcon={<Add />}>
          Add Session
        </Button>
      </Box>
    </Box>
  );
}
