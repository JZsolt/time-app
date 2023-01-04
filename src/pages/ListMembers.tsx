import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import axiosHttp from "../services/instance";

interface IMember {
  id: number;
  attributes: {
    firstName: string;
    lastName: string;
  };
}

interface IMemberList {
  data: IMember[];
}

const ListMembers = () => {
  const [memberList, setMemberList] = useState<IMemberList>();

  const members = async () => {
    await axiosHttp
      .get("/api/members")
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
    <div>
      ListMembers
      {memberList?.data?.map((member: IMember, index: number) => {
        return (
          <Box key={member.id}>
            {index + 1}:{member.attributes.firstName} {member.attributes.lastName}
          </Box>
        );
      })}
    </div>
  );
};

export default ListMembers;
