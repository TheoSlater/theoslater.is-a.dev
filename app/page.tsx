"use client";

import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            p: { xs: 3, md: 5 },
            backgroundColor: "background.paper",
            textAlign: "center",
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Portfolio content is coming soon.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            I'm polishing a fresh portfolio experience to showcase selected
            projects, case studies, and creative experiments. Stay tuned while I
            get everything ready for launch.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
