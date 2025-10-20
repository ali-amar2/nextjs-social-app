import Link from "next/link";
import { Container, Typography, Button, Box } from "@mui/material";

export default function NotFound() {
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "5rem", fontWeight: "bold", mb: 2 }}>
        404
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Sorry, the page you are looking for could not be found.
      </Typography>
      <Box>
        <Button
          component={Link}
          href="/"
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, px: 3, py: 1 }}
        >
          Go back home
        </Button>
      </Box>
    </Container>
  );
}
