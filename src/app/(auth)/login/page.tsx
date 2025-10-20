"use client";
import { TextField, Box, Paper, Button } from "@mui/material";
import { useFormik } from "formik";
import { login } from "@/store/features/user.slice";
import { useAppDispatch } from "@/hooks/store.hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(login(values))
        .then((res) => {
          if (res.payload.message === "success") {
            setTimeout(() => {
              router.push("/");
            }, 2000);
          }
        })
        .catch((error) => { toast.error(error) });
    },
  });

  return (
    <Box sx={{ width: { xs: "90%", sm: "70%", md: "500px" }, mx: "auto", p: { xs: 1, sm: 2 }, mt: 10, }}>
      <Paper elevation={6} sx={{ p: { xs: 2, sm: 4 } }}>
        <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }} >
          <TextField
            fullWidth
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
