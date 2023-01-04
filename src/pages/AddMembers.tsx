import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import axiosHttp from "../services/instance";

interface Inputs {
  firstName: string;
  lastName: string;
}

const AddMembers = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const addMembers = async (data: object) => {
    await axiosHttp
      .post("/api/members", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const dataObj = {
      data: data,
    };
    addMembers(dataObj);
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
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <TextField
                margin="normal"
                fullWidth
                id="fname"
                label="First Name*"
                name="fname"
                autoFocus
                onChange={onChange}
                error={errors.firstName ? true : false}
                helperText={errors.firstName ? "This field is required" : ""}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <TextField
                margin="normal"
                fullWidth
                id="lname"
                label="Last Name*"
                name="lname"
                onChange={onChange}
                error={errors.lastName ? true : false}
                helperText={errors.lastName ? "This field is required" : ""}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddMembers;
