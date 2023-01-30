import { Container, Grid, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { profileLabel } from "../services/constants";
import axiosHttp from "../services/instance";

interface IMember {
  id: number;
  attributes: {
    firstName: string;
    lastName: string;
    talk: boolean;
    spiritualGems: boolean;
    bReading: boolean;
    conversation: boolean;
    smallTalk: boolean;
    livingAsCh: boolean;
    bibleStudy: boolean;
  };
}

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
                sx={{ paddingLeft: "5px !important", paddingRight: "5px !important", borderRight: "1px solid", width: "11.11%" }}
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
                  }}
                >
                  {item.label}
                </Typography>
                {memberList?.data?.map((member: IMember, index: number) => {
                  return item.id === "name" ? (
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
                      <Link
                        style={{ textDecoration: "none", color: "unset" }}
                        to={`/edit-member?memberId=${member.id}`}
                      >
                        <Box sx={{ textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {index + 1}. {member.attributes.firstName} {member.attributes.lastName}
                        </Box>
                      </Link>
                    </Tooltip>
                  ) : (
                    member.attributes[item.id as keyof boolean] && (
                      <Box key={member.id}>
                        {member.attributes.firstName} {member.attributes.lastName}
                      </Box>
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
