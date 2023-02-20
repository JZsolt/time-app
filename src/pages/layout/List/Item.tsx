import { Box, Modal, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IMember } from "../../../services/interfaces";
import ClearIcon from "@mui/icons-material/Clear";
import axiosHttp from "../../../services/instance";
import { useState } from "react";
import AlertModal from "../../../components/AlertModal";

const boxhoverSX = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "2px 4px",
  transition: ".3s ease-out",
  svg: {
    height: "19px",
    display: "none",
    transition: ".3s ease-out",
    "&:hover": { transform: "rotate(180deg)" },
  },
  "&:hover": {
    background: "#d8d8d8",
    borderRadius: "4px",
    a: {
      //width: "calc(100% - 24px)",
      div: {
        color: "#000",
      },
    },
    svg: { display: "block" },
  },
};

const Item = ({ member, index, link, deleteBtn }: { member: IMember; index?: number; link: string; deleteBtn?: boolean }) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [deleteMemberId, setDeleteMemberId] = useState<number>();

  const deleteMember = async (id: number) => {
    await axiosHttp
      .delete(`/members/${id}`)
      .then((response) => {
        window.location.reload();
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openAlertModal = (memberId: number) => {
    setModalState(true);
    setDeleteMemberId(memberId);
  };

  return (
    <>
      <Tooltip
        key={member.id}
        arrow
        placement="right"
        title={
          <Typography sx={{ fontSize: "16px" }}>
            {member.attributes.firstName} {member.attributes.lastName}
          </Typography>
        }
      >
        <Box sx={boxhoverSX}>
          <Link
            style={{ textDecoration: "none", color: "unset" }}
            to={link}
          >
            <Box sx={{ color: "#333", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {index != undefined ? `${index + 1}.` : ""} {member.attributes.firstName} {member.attributes.lastName}
            </Box>
          </Link>
          {deleteBtn && (
            <ClearIcon
              onClick={() => openAlertModal(member.id)}
              sx={{ color: "#f44336", cursor: "pointer" }}
            />
          )}
        </Box>
      </Tooltip>
      <AlertModal
        modalState={modalState}
        closeModal={() => setModalState(false)}
        handleAction={() => deleteMember(deleteMemberId!)}
        title="Are you sure?"
        description="Do you really want to delete this member? This process cannot be undone!"
      />
    </>
  );
};

export default Item;
