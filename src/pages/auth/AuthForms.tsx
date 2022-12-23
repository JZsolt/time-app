import { Tabs, Tab, Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import { SyntheticEvent, useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AuthForms = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 500, width: "50%", margin: "auto", marginTop: 6 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{ width: "50%" }}
            label="Log In"
          />
          <Tab
            sx={{ width: "50%" }}
            label="Sign Up"
          />
        </Tabs>
      </Box>
      <CardContent>
        <TabPanel
          value={value}
          index={0}
        >
          <LogIn changeTab={setValue} />
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
        >
          <SignUp />
        </TabPanel>
      </CardContent>
    </Card>
  );
};

export default AuthForms;
