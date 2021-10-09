import { useState } from 'react';
import { useEffect } from 'react';
import { useSetRecoilState } from "recoil";
import { currentMenuState } from "../../../recoil/atoms";

export default function CompanyNoticePage(){
    const [tabledata, setTabledata] = useState({
        allDeviceCount: 'Notice'
    })
    const setCurrentMenu = useSetRecoilState(currentMenuState);
    useEffect(()=> {
        setCurrentMenu(['공지사항']);
    }, [setCurrentMenu]);
    return <div>공지사항 페이지{tabledata.allDeviceCount}</div>
}