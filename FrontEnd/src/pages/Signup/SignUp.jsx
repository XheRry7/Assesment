import * as React from "react";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CommonSnackbar from "../../components/Snackbar/Snackbar";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Car App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const validationSchema = Yup.object({
  firstName: Yup.string().required("firstName is required"),
  lastName: Yup.string().required("lastName is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function SignUp() {
  const [error, setErrors] = useState([]);
  const [open, setOpen] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formValues = {
      email: data.get("email"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    };
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      const res = await axios.post(
        "http://localhost:5000/api/user/sign-up",
        formValues
      );
      if (res.status === 200) {
        setErrors([]);
        setOpen(true);
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        let errors = [];
        err.inner.forEach((error) => {
          errors.push(error.message);
        });
        setErrors(errors);
        setOpen(true);
      } else {
        setErrors([err.message]);
        setOpen(true);
      }
    }
  };
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
      {error.length > 0 ? (
        <CommonSnackbar
          open={open}
          setOpen={setOpen}
          severity="error"
          message={error[0]}
        />
      ) : (
        <CommonSnackbar
          open={open}
          setOpen={setOpen}
          severity="success"
          message="A Temporary Password has been sent to your gmail."
          login={true}
        />
      )}
    </>
  );
}
