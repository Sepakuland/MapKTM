
import { useTheme } from '@emotion/react';
import { Button } from '@mui/material'
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useTranslation } from 'react-i18next';
import * as Yup from "yup";

const EditArea = ({ closeModalAndReload, updateModalData }) => {
    const { t, i18n } = useTranslation();
    const appConfig = window.globalConfig;
    const theme = useTheme();
    console.log("updateModalData", updateModalData);
    const formik = useFormik({
        initialValues: {
            displayName: "",

        },
        validateOnChange: false,
        validationSchema: Yup.object({
            displayName: Yup.string().required("نام منطقه الزامی است")
        }),
        onSubmit: (values) => {


            let valuessss = {
                areasPlacementId: updateModalData?.current.areasPlacementId,
                placementParentId: updateModalData?.current.placementParentId,
                displayName: values.displayName,
                level: updateModalData?.current.level,
            }
            console.log("all values", values);

            let isSuccess = false;
            if (values.displayName !== "") {

                axios
                    .put(`${appConfig.BaseURL}/api/AreasPlacement/Update/${valuessss.areasPlacementId}`, valuessss)
                    .then((res) => {
                        isSuccess = true;
                    })
                    .catch((res) => {
                        isSuccess = false;
                    }).finally(() => {
                        if (isSuccess) {
                            closeModalAndReload();
                        }
                    })
            }
        },
    })

    console.log("updateModalData", updateModalData)
    return (
        <>
            <div className="form-design">
                <div className="row">

                    <div className="col-lg-6 col-md-6 col-6">
                        <div className="title">
                            <span>{t("نام ناحیه")}</span>
                        </div>
                        <input type="text" name="displayName" id="displayName"
                            placeholder={updateModalData?.current?.displayName}
                            onChange={(e) => {
                                formik.setFieldValue("displayName", e.target.value)
                            }} />
                    </div>
                </div>


            </div>
            <div className='d-flex flex-row-reverse justify-content-center'>
                <div className='m-1'>
                    <Button type='submit' onClick={formik.handleSubmit} variant="contained" color='success' style={{ margin: "auto", width: "55px" }}>{("تایید")}</Button>
                </div>
                <div className='m-1'>
                    <Button onClick={closeModalAndReload} variant="contained" color='error' style={{ margin: "auto", width: "55px" }}>{("بازگشت")}</Button>
                </div>
            </div>
        </>
    )
}

export default EditArea
