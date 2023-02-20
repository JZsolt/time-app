import { useEffect, useState } from "react";
import { memberWithAttr } from "../services/constants";
import { getDataAttr } from "../services/getters";
import { shufle } from "../services/helpers";
import axiosHttp from "../services/instance";
import { IMember } from "../services/interfaces";

export const useMemberByAttr = () => {
  const [memberList, setMemberList] = useState<IMember[]>();
  const [newMemberList, setNewMemberList] = useState<{ id: string; name: string }[]>();

  const getMembers = async () => {
    await axiosHttp
      .get("/members?pagination[pageSize]=200")
      .then((members) => {
        setMemberList(members.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMembers();
  }, []);

  useEffect(() => {
    if (memberList) findMemberByAttr();
  }, [memberList]);

  const findMemberByAttr = () => {
    let shufledList = shufle(memberList);
    let duplicated = false;

    memberWithAttr.map((item) => {
      let key = item.id.split("_")[0];
      let selectedMember = shufledList?.find((member: any) => getDataAttr(member)[key] === true);

      if (selectedMember === undefined) {
        shufledList = shufle(memberList);
        selectedMember = shufledList?.find((member: any) => getDataAttr(member)[key] === true);
        item.name = getDataAttr(selectedMember)?.firstName;

        shufledList = shufledList.filter((itemFiltered) => {
          return getDataAttr(itemFiltered)?.firstName !== getDataAttr(selectedMember)?.firstName;
        });
        duplicated = true;
      } else {
        if (!duplicated && memberWithAttr.find((existedItem: any) => existedItem.name === getDataAttr(selectedMember)?.firstName)) {
          shufle(memberList);
        } else {
          item.name = getDataAttr(selectedMember)?.firstName;

          shufledList = shufledList.filter((itemFiltered) => {
            return getDataAttr(itemFiltered)?.firstName !== getDataAttr(selectedMember)?.firstName;
          });
        }
      }
    });

    setNewMemberList(memberWithAttr);
  };

  if (memberList) return newMemberList;
};
