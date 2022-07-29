import {useState} from "react";


export const useContactsList = () => {
    const [checkedContactIds, setCheckedContactIds] = useState<any[]>([]);

    const changeCheckedContactsList = (contactId: number, isChecked: boolean) => {
        console.log('contactId',contactId);
        console.log('isChecked',isChecked);
        isChecked ?
            setCheckedContactIds(checkedIds => checkedIds.filter(item => item !== contactId)) :
            setCheckedContactIds( checkedIds => [...checkedIds, contactId]);
        console.log('checkedContactIds',checkedContactIds);
    }

    return {checkedContactIds, changeCheckedContactsList}
}