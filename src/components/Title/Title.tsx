import { Box, styled, Typography } from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import { Button } from "../elements";

const TitleWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  column-gap: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex-wrap: wrap;
    row-gap: 2rem;
  }
`;

const TitleDetail = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 2.5rem;
`;

export default function Title() {
  return (
    <TitleWrapper>
      <TitleDetail>
        <Typography variant="h4" color={({ palette }) => palette.text.primary}>
          Belajar dan Praktik Cinematic Videography
        </Typography>
        <Typography
          variant="caption"
          color={({ palette }) => palette.grey["600"]}>
          Last edited{" "}
          {new Intl.DateTimeFormat("id-ID", {
            timeStyle: "short",
            dateStyle: "long",
          }).format(new Date())}
        </Typography>
      </TitleDetail>
      <Box>
        <Button variant="outlined" startIcon={<VisibilityOutlined />}>
          Preview
        </Button>
      </Box>
    </TitleWrapper>
  );
}
