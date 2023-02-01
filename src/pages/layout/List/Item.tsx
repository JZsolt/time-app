import { Box, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IMember } from "../../../services/interfaces";
import ClearIcon from "@mui/icons-material/Clear";
import axiosHttp from "../../../services/instance";

const boxhoverSX = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "2px 4px",
  transition: ".3s ease-out",
  svg: {
    height: "19px",
    display: "none",
  },
  "&:hover": {
    background: "#d8d8d8",
    borderRadius: "4px",
    a: {
      div: {
        color: "#000",
      },
    },
    svg: { display: "block" },
  },
};

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

const Item = ({ member, index, link, deleteBtn }: { member: IMember; index?: number; link: string; deleteBtn?: boolean }) => {
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
              onClick={() => deleteMember(member.id)}
              sx={{ color: "#f44336", cursor: "pointer" }}
            />
          )}
        </Box>
      </Tooltip>
    </>
  );
};

export default Item;
