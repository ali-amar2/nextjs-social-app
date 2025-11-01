"use client"
import { useFormik } from "formik";
import { TextField, Box, Paper, Button, Radio, RadioGroup, FormLabel, FormControlLabel, Typography } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { object, ref, string } from "yup";

export default function UserForm() {
    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const router = useRouter()
    const validationSchema = object({
        name: string().required("Name is required").min(3, "Name Must be at leat three characters"),
        email: string().required("Email is required").email("Invalid Email"),
        dateOfBirth: string().required("Date of Birth is required"),
        gender: string().required("Gender is required"),
        password: string().required("Password is required").matches(passRegex, "Password must be at least 8 characters long, include one uppercase, one lowercase, one number, and one special character."),
        rePassword: string().required("Confirm password is required").oneOf([ref("password")], "Password and Confirm Password must match")
    })
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            dateOfBirth: "",
            gender: "",
            password: "",
            rePassword: "",
        },
        validationSchema,

        onSubmit: async (values) => {
            const loadingToastID = toast.loading("Waiting ..");
            try {
                const options = {
                    url: "https://linked-posts.routemisr.com/users/signup",
                    method: "POST",
                    data: values,
                }
                const { data } = await axios.request(options)
                if (data.message === "success") {
                    toast.success("Email Created Successfully")
                    setTimeout(() => {
                        router.push("/login")
                    }, 2000);
                }
            } catch (error) {
                console.log(error);
                toast.error("Account Already Exist");
            } finally {
                toast.dismiss(loadingToastID)
            }
        },
    });

    return (
        <Box
            sx={{ width: { xs: "90%", sm: "70%", md: "500px" }, mx: "auto", p: { xs: 1, sm: 2 }, }}>
            <Paper elevation={6} sx={{ p: { xs: 2, sm: 4 } }}>
                <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }} >
                    <TextField
                        fullWidth
                        name="name"
                        id="name"
                        label="name"
                        type="text"
                        variant="outlined"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <Typography component="p" sx={{ color: "red", ml: 1 }}>{formik.errors.name}</Typography>
                    )}
                    <TextField
                        name="email"
                        fullWidth
                        id="email"
                        label="email"
                        type="email"
                        variant="outlined"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <Typography component="p" sx={{ color: "red", ml: 1 }}>{formik.errors.email}</Typography>
                    )}
                    <TextField
                        fullWidth
                        name="dateOfBirth"
                        id="dateOfBirth"
                        label="Date of Birth"
                        type="date"
                        variant="outlined"
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
                        <Typography component="p" sx={{ color: "red", ml: 1 }}>{formik.errors.dateOfBirth}</Typography>
                    )}
                    <TextField
                        fullWidth
                        name="password"
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <Typography component="p" sx={{ color: "red", ml: 1 }}>{formik.errors.password}</Typography>
                    )}
                    <TextField
                        fullWidth
                        name="rePassword"
                        id="rePassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        value={formik.values.rePassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.rePassword && formik.touched.rePassword && (
                        <Typography component="p" sx={{ color: "red", ml: 1 }}>{formik.errors.rePassword}</Typography>
                    )}
                    <Box>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            row
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                    </Box>
                    {formik.errors.gender && formik.touched.gender && (
                        <Typography component="p" sx={{ color: "red", ml: 1 }}>{formik.errors.gender}</Typography>
                    )}
                    <Button type="submit" variant="contained" fullWidth>
                        Sign up
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
