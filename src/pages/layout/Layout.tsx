import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box className="main">
      <Header />
      <Box className="content">{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
