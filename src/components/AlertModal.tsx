import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const style = {
  outline: "none !important",
  position: "absolute" as "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const AlertModal = ({ modalState, closeModal, handleAction, title, description }: { modalState: boolean; closeModal: () => void; handleAction: () => void; title: string; description: string }) => {
  const onAction = () => {
    handleAction();
    closeModal();
  };

  return (
    <>
      <Modal
        open={modalState}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ textAlign: "center" }}>
            <ErrorIcon sx={{ fontSize: "100px", color: "#ffa1a1" }} />
          </Box>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            textAlign="center"
            sx={{ textWeight: "bold !important" }}
          >
            {title}
          </Typography>
          <Typography
            id="modal-modal-description"
            textAlign="center"
            sx={{ mt: 2 }}
          >
            {description}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing="12px"
            marginTop="20px"
          >
            <Button
              variant="contained"
              onClick={onAction}
              sx={{ width: "100px" }}
              color="error"
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              onClick={closeModal}
              sx={{ width: "100px" }}
              color="error"
            >
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default AlertModal;
