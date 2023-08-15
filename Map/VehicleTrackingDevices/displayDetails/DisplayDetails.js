import { React, useRef, useState } from "react";
import RKGrid from "../../../../../components/RKGrid/RKGrid";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import IndexCell from "../../../../../components/RKGrid/IndexCell";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const DisplayDetails = () => {
    const theme = useTheme();
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [data, setData] = useState([]);
    const dataRef = useRef();
    const appConfig = window.globalConfig;
    const [SearchParams] = useSearchParams();
    const id = SearchParams.get("id");
    dataRef.current = data;
    const [selectedRows, SetSelectedRows] = useState();
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [excelData, setExcelData] = useState([]);

    // useEffect(() => {
    // let tempData = Data.map((data) => {
    // let temp = (data.Debtor).toString().replaceAll(',', '')
    // let cost = parseFloat(temp, 2)

    // let temp2 = (data.Creditor).toString().replaceAll(',', '')
    // let cost2 = parseFloat(temp2, 2)


    //   return {
    //     ...data,
    //     // DocumentDate: new Date(data.DocumentDate),
    //     // Debtor: cost,
    //     // Creditor: cost2,

    //   }
    // })
    // setData(Data)



    // let tempExcel = Data?.map((data, index) => {
    //     let temp = (data.Debtor).toString().replaceAll(',', '')
    //     let cost = parseFloat(temp, 2)

    //     let temp2 = (data.Creditor).toString().replaceAll(',', '')
    //     let cost2 = parseFloat(temp2, 2)


    //   return {
    //     ...data,
    //     DocumentDate: new Date(data.DocumentDate),
    //     Debtor: cost,
    //     Creditor: cost2,

    //   }
    // })
    // setExcelData(tempExcel)

    //   }, [i18n.language])
    // console.log("data",data)


    // useEffect(() => {
    //     if (location?.search !== "") {
    //         getData();
    //     }
    // }, [location]);

    let tempColumn = [
        {
            field: "IndexCell",
            filterable: false,
            width: "60px",
            name: "ردیف",
            cell: IndexCell,
            sortable: false,
            reorderable: true,
        },
        {
            field: "device",
            name: "دستگاه",
            children: [
                {
                    field: "IMEI",
                    name: "IMEI",
                    filterable: true
                },
                {
                    field: "title",
                    name: "عنوان",
                    filterable: true
                },

            ]
        },
        {
            field: "Driver",
            name: "راننده",
            children: [
                {
                    field: "code",
                    name: "کد",
                    filterable: true
                },
                {
                    field: "name",
                    name: "نام",
                    filterable: true
                },

            ]
        },

        {
            field: "car",
            name: "خودرو",
            children: [
                {
                    field: "number",
                    name: "شماره",
                    filterable: true
                },
                {
                    field: "title",
                    name: "عنوان",
                    filterable: true
                },

            ]
        },


    ];




    return (
        <>
            <div
                style={{
                    backgroundColor: `${theme.palette.background.paper}`,
                    padding: "20px",
                }}
            >
                <RKGrid
                    gridId={"TrackingDevices"}
                    gridData={data}
                    columnList={tempColumn}
                    showSetting={true}
                    showChart={false}
                    showExcelExport={true}
                    showPrint={true}
                    rowCount={10}
                    sortable={true}
                    pageable={true}
                    reorderable={true}
                    selectable={false}
                    selectKeyField={"TrackingDevicesId"}
                    showFilter={true}
                    total={total}
                    showTooltip={true}
                    loading={loading}
                // getSelectedRows={getSelectedRows}
                // 
                />

            </div>
        </>
    );
};
export default DisplayDetails;
