import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, FormControlLabel, Switch, TextField } from "@mui/material";
import axiosHttp from "../services/instance";
import { profileLabel } from "../services/constants";
import { toast } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Inputs {
  firstName: string;
  lastName: string;
  clmChairman: boolean;
  talk: boolean;
  spiritualGems: boolean;
  bReading: boolean;
  conversation: boolean;
  smallTalk: boolean;
  livingAsCh: boolean;
  bibleStudy: boolean;
}
const profile = profileLabel;

const AddMembers = () => {
  const [member, setMember] = useState<Inputs>();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    defaultValues: {
      clmChairman: member ? member?.clmChairman : false,
      talk: false,
      spiritualGems: false,
      bReading: false,
      conversation: false,
      smallTalk: false,
      livingAsCh: false,
      bibleStudy: false,
    },
  });

  const [searchParams] = useSearchParams();
  const memberId = searchParams.get("memberId");

  const getMember = async (memberId: string) => {
    await axiosHttp
      .get(`/members/${memberId}`)
      .then((response) => {
        setMember(response.data.data.attributes);
        setValue("firstName", response.data.data.attributes.firstName);
        setValue("lastName", response.data.data.attributes.lastName);
        setValue("clmChairman", response.data.data.attributes.clmChairman);
        setValue("talk", response.data.data.attributes.talk);
        setValue("spiritualGems", response.data.data.attributes.spiritualGems);
        setValue("bReading", response.data.data.attributes.bReading);
        setValue("conversation", response.data.data.attributes.conversation);
        setValue("smallTalk", response.data.data.attributes.smallTalk);
        setValue("livingAsCh", response.data.data.attributes.livingAsCh);
        setValue("bibleStudy", response.data.data.attributes.bibleStudy);
        console.log(response.data.data.attributes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addMembers = async (data: object) => {
    await axiosHttp
      .post("/members", data)
      .then((response: any) => {
        toast.success((t) => (
          <span>
            Sikeresen hozzá lett adva:
            <b>
              {response.data.data.attributes.firstName} {response.data.data.attributes.lastName}
            </b>
          </span>
        ));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editMember = async (data: object) => {
    await axiosHttp
      .put("/members/" + memberId, data)
      .then((response: any) => {
        toast.success((t) => (
          <span>
            Sikeresen módosítottad:
            <b>
              {response.data.data.attributes.firstName} {response.data.data.attributes.lastName}
            </b>
          </span>
        ));
        navigate("/");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const dataObj = {
      data: data,
    };

    if (memberId) {
      editMember(dataObj);
    } else {
      addMembers(dataObj);
    }
  };

  useEffect(() => {
    if (memberId) {
      getMember(memberId);
    }
  }, []);

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
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                margin="normal"
                fullWidth
                id="fname"
                label="First Name*"
                name="firstName"
                autoFocus
                error={errors.firstName ? true : false}
                helperText={errors.firstName ? "This field is required" : ""}
                value={value}
                InputLabelProps={{ shrink: value ? true : false }}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                fullWidth
                id="lname"
                label="Last Name*"
                name="lname"
                onChange={onChange}
                error={errors.lastName ? true : false}
                helperText={errors.lastName ? "This field is required" : ""}
                value={value}
                InputLabelProps={{ shrink: value ? true : false }}
              />
            )}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {profile.map((item) => {
              return (
                <Controller
                  name={item.id as keyof Inputs}
                  key={item.id}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={value ? true : false}
                          onChange={onChange}
                        />
                      }
                      label={item.label}
                    />
                  )}
                />
              );
            })}
          </Box>
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
