import { Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { axiosHttp } from "../../services/instance";
import { toast } from "react-hot-toast";

type Inputs = {
  identifier: string;
  password: string;
  form: string;
};

const LogIn = ({ changeTab }: { changeTab: Function }) => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>();

  const [showPassword, setShowPassword] = useState(false);

  const login = async (data: Inputs) => {
    await axiosHttp
      .post("api/auth/local", data)
      .then((res) => {
        console.log(res);
        let user: { username: string; email: string; jwt: string } = {
          username: res.data.user.username,
          email: res.data.user.email,
          jwt: res.data.jwt,
        };
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.error?.message) {
          setError("form", { message: error?.response?.data?.error?.message });
        } else {
          toast.error("Something went wrong please try again later!");
        }
      });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    clearErrors();
    login(data);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name="identifier"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address*"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                onChange={onChange}
                error={errors.identifier ? true : false}
                helperText={errors.identifier ? "This field is required" : ""}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <FormControl
                id="password"
                margin="normal"
                fullWidth
                error={errors.password ? true : false}
              >
                <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  onChange={onChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {errors.password && (
                  <FormHelperText
                    error
                    id="accountId-error"
                  >
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <FormHelperText
            error
            id="accountId-error"
          >
            {errors.form?.message ? errors.form?.message : ""}
          </FormHelperText>
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid
              item
              xs
            >
              <NavLink to="#">Forgot password?</NavLink>
            </Grid>
            <Grid item>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => changeTab(1)}
              >
                Don't have an account? Sign Up
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default LogIn;
