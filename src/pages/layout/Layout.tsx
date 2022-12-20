import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box className="main">
      <Header />
      <Box className="content">{children}</Box>
      <Footer />
      <Toaster toastOptions={{ duration: 2500 }} />
    </Box>
  );
};

export default Layout;
