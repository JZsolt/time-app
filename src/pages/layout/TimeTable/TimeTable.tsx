import { Box, Container, Grid, Typography } from "@mui/material";
import icon1 from "../../../assets/img/gyongy.png";
import icon2 from "../../../assets/img/fejlodj.png";
import icon3 from "../../../assets/img/keresztenyi.png";
import { useMemberByAttr } from "../../../hooks/useMemberByAttr";
import { useEffect, useState } from "react";
import {
  BIBLESTUDY,
  BREADING,
  CLMCHAIRMAN,
  CONVERSATION1,
  CONVERSATION2,
  CONVERSATION3,
  CONVERSATION4,
  CONVERSATION5,
  CONVERSATION6,
  LIVINGASCH1,
  LIVINGASCH2,
  SPIRITUALGEMS,
  TALK,
} from "../../../services/constants";

const TimeTable = () => {
  let meberByAttr = useMemberByAttr();

  const getMemberByType = (type: string) => {
    let asd = meberByAttr?.find((member) => member.id === type);

    return asd?.name;
  };

  return (
    <>
      <Container sx={{ mt: "2rem" }}>
        <Box sx={{ boxShadow: "0px 0px 5px #0000005c", borderRadius: "8px", padding: "20px", maxWidth: "700px", marginInline: "auto" }}>
          <Grid
            container
            fontSize={"20px"}
          >
            <Grid
              item
              xs={6}
              sx={{ borderBottom: "1px solid #e6e6e6", paddingBottom: "5px" }}
            >
              <Box
                component={"span"}
                color={"#818181"}
              >
                Elnöklő:{" "}
              </Box>
              <strong>{getMemberByType(CLMCHAIRMAN)}</strong>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ borderBottom: "1px solid #e6e6e6", paddingBottom: "5px", textAlign: "right" }}
            >
              <Box
                component={"span"}
                color={"#818181"}
              >
                Kezdő ima:{" "}
              </Box>
              <strong>{getMemberByType(CLMCHAIRMAN)}</strong>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", padding: "20px 0 10px 0" }}
            >
              <img
                width={50}
                src={icon1}
              />
              <Typography
                fontSize={"22px"}
                fontWeight={"bold"}
                color={"#626262"}
                marginLeft={1}
              >
                GYÖNGYSZEMEK ISTEN SZAVÁBÓL
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              color={"#818181"}
            >
              Előadás
            </Grid>
            <Grid
              item
              xs={4}
              color={"#818181"}
              sx={{ borderInline: "1px solid #e6e6e6", paddingLeft: "10px" }}
            >
              Szellemi kincsek
            </Grid>
            <Grid
              item
              xs={4}
              color={"#818181"}
              sx={{ paddingLeft: "10px" }}
            >
              Bibliaolvasás
            </Grid>
            <Grid
              item
              xs={4}
            >
              <strong>{getMemberByType(TALK)}</strong>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ borderInline: "1px solid #e6e6e6", paddingLeft: "10px" }}
            >
              <strong>{getMemberByType(SPIRITUALGEMS)}</strong>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ paddingLeft: "10px" }}
            >
              <strong>{getMemberByType(BREADING)}</strong>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", padding: "15px 0 10px 0", marginTop: "15px", borderTop: "1px solid #e6e6e6" }}
            >
              <img
                width={50}
                src={icon2}
              />
              <Typography
                fontSize={"22px"}
                fontWeight={"bold"}
                color={"#9d5d07"}
                marginLeft={1}
              >
                FEJLŐDJÜNK A SZOLGÁLATBAN
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              color={"#818181"}
            >
              Első beszélgetés
            </Grid>
            <Grid
              item
              xs={4}
              color={"#818181"}
              sx={{ borderInline: "1px solid #e6e6e6", paddingLeft: "10px" }}
            >
              Újralátogatás
            </Grid>
            <Grid
              item
              xs={4}
              color={"#818181"}
              sx={{ paddingLeft: "10px" }}
            >
              Bibliatanulmányozás
            </Grid>
            <Grid
              item
              xs={4}
            >
              <strong>{getMemberByType(CONVERSATION1)}</strong>
              <br />
              <Box
                fontWeight={"bold"}
                color={"#626262"}
              >
                {getMemberByType(CONVERSATION2)}
              </Box>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ borderInline: "1px solid #e6e6e6", paddingLeft: "10px" }}
            >
              <strong>{getMemberByType(CONVERSATION3)}</strong>
              <br />
              <Box
                fontWeight={"bold"}
                color={"#626262"}
              >
                {getMemberByType(CONVERSATION4)}
              </Box>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ paddingLeft: "10px" }}
            >
              <strong>{getMemberByType(CONVERSATION5)}</strong>
              <br />
              <Box
                fontWeight={"bold"}
                color={"#626262"}
              >
                {getMemberByType(CONVERSATION6)}
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", padding: "15px 0 10px 0", marginTop: "15px", borderTop: "1px solid #e6e6e6" }}
            >
              <img
                width={50}
                src={icon3}
              />
              <Typography
                fontSize={"22px"}
                fontWeight={"bold"}
                color={"#942926"}
                marginLeft={1}
              >
                KERESZTÉNYI ÉLETÜNK
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Box
                component={"span"}
                color={"#818181"}
              >
                I program:{" "}
              </Box>
              <strong>{getMemberByType(LIVINGASCH1)}</strong>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ borderBottom: "1px solid #e6e6e6", margin: "10px 0", paddingBottom: "10px" }}
            >
              <Box
                component={"span"}
                color={"#818181"}
              >
                II program:{" "}
              </Box>
              <strong>{getMemberByType(LIVINGASCH2)}</strong>
            </Grid>
            <Grid
              item
              xs={6}
            >
              <Box
                component={"span"}
                color={"#818181"}
              >
                Gyülekezeti bt.:{" "}
              </Box>
              <strong>{getMemberByType(BIBLESTUDY)}</strong>
            </Grid>
            <Grid
              item
              xs={6}
              textAlign="right"
            >
              <Box
                component={"span"}
                color={"#818181"}
              >
                Olvasó Gy. bt.:{" "}
              </Box>
              <strong>Jenei Zsolt</strong>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ borderTop: "1px solid #e6e6e6", margin: "10px 0", paddingTop: "10px", textAlign: "right" }}
            >
              <Box
                component={"span"}
                color={"#818181"}
              >
                Záró ima:{" "}
              </Box>
              <strong>Jenei Zsolt</strong>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default TimeTable;
