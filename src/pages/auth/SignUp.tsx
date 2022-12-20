import { Avatar, Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { axiosHttp } from "../../services/instance";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { watch } from "fs";

type Inputs = {
  username: string;
  email: string;
  password: string;
  form: string;
};

const SignUp = () => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>();

  const [showPassword, setShowPassword] = useState(false);

  const register = async (data: Inputs) =>
    await axiosHttp
      .post("api/auth/local/register", data)
      .then((res) => {
        console.log(res);
        let user: { username: string; email: string; jwt: string } = {
          username: res.data.user.username,
          email: res.data.user.email,
          jwt: res.data.jwt,
        };
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.error?.message) {
          setError("form", { message: error?.response?.data?.error?.message });
        } else {
          toast.error("Something went wrong please try again later!");
        }
      });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    clearErrors();
    register(data);
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
          <LockOpenIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign Up
        </Typography>
        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <TextField
                  id="username"
                  label="Username"
                  margin="normal"
                  fullWidth
                  autoFocus
                  onChange={onChange}
                  error={errors.username ? true : false}
                  helperText={errors.username ? "This field is required" : ""}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <TextField
                  id="email"
                  label="Email Address"
                  type="email"
                  margin="normal"
                  fullWidth
                  onChange={onChange}
                  error={errors.email ? true : false}
                  helperText={errors.email ? "This field is required" : ""}
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
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
            <Button
              onClick={() => clearErrors()}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SignUp
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
