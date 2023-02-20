import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
          sx={{ flexWrap: "nowrap", border: "1px solid #e6e6e6", borderRadius: "8px", boxShadow: "1px 1px 5px #e6e6e6" }}
        >
          {header.map((item, index) => {
            return (
              <Grid
                key={item.id}
                item
                sx={{ padding: "5px !important", borderRight: `${header.length !== index + 1 ? "1px solid #e6e6e6" : ""}`, width: "11.11%" }}
              >
                <Typography
                  sx={{
                    color: "#818181",
                    fontWeight: "bold",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    minHeight: "50px",
                    borderBottom: "1px solid #e6e6e6",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  {item.label}
                </Typography>
                {memberList?.data?.map((member: IMember, index: number) => {
                  return item.id === "name" ? (
                    <Item
                      key={index}
                      member={member}
                      index={index}
                      link={`/edit-member?memberId=${member.id}`}
                      deleteBtn={true}
                    />
                  ) : (
                    member.attributes[item.id as keyof boolean] && (
                      <Item
                        key={index}
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
