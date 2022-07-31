import { useEffect, useState } from "react";

export const useContactsList = () => {
  const [checkedContactIds, setCheckedContactIds] = useState<number[]>([]);
  useEffect(() => {
    console.log("selected contacts: ", checkedContactIds);
  }, [checkedContactIds]);

  const changeCheckedContactsList = (contactId: number, isChecked: boolean) => {
    isChecked
      ? setCheckedContactIds((checkedIds) =>
          checkedIds.filter((item) => item !== contactId)
        )
      : setCheckedContactIds((checkedIds) => [...checkedIds, contactId]);
  };

  const getCheckedContactsIds = () => {
    return checkedContactIds;
  };

  return { changeCheckedContactsList, getCheckedContactsIds };
};
