import { Container, Grid, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { profileLabel } from "../../../services/constants";
import axiosHttp from "../../../services/instance";
import { IMember } from "../../../services/interfaces";
import Item from "./Item";

interface IMemberList {
  data: IMember[];
}

const ListMembers = () => {
  const [memberList, setMemberList] = useState<IMemberList>();

  const header = [{ label: "Név", id: "name" }, ...profileLabel];
  console.log(header);

  const members = async () => {
    await axiosHttp
      .get("/members?pagination[pageSize]=200")
      .then((members) => {
        setMemberList(members.data);
        console.log(members.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    members();
  }, []);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ mt: "2rem" }}
      >
        <Grid
          container
          spacing={2}
          sx={{ flexWrap: "nowrap" }}
        >
          {header.map((item) => {
            return (
              <Grid
                key={item.id}
                item
                sx={{ padding: "5px !important", borderRight: "1px solid", width: "11.11%" }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    minHeight: "50px",
                    borderBottom: "1px solid",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  {item.label}
                </Typography>
                {memberList?.data?.map((member: IMember, index: number) => {
                  return item.id === "name" ? (
                    <Item
                      member={member}
                      index={index}
                      link={`/edit-member?memberId=${member.id}`}
                      deleteBtn={true}
                    />
                  ) : (
                    member.attributes[item.id as keyof boolean] && (
                      <Item
                        member={member}
                        link={`/edit-member?memberId=${member.id}`}
                      />
                    )
                  );
                })}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default ListMembers;
