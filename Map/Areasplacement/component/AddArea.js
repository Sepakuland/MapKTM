
import { useTheme } from '@emotion/react';
import { Button, CircularProgress } from '@mui/material'
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import * as Yup from "yup";

const AddArea = ({ closeModalAndReload, createModalData, levelOfNode }) => {

    console.log("Creeeeeeee", createModalData)
    console.log("levelOfNode", levelOfNode)
    const { t, i18n } = useTranslation();
    const appConfig = window.globalConfig;
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const formik = useFormik({
        initialValues: {
            displayName: "",
            parentId: 0
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            displayName: Yup.string().required("نام منطقه الزامی است")
        }),
        onSubmit: (values) => {
            setLoading(true)

            let isSuccess = false;
            if (values.displayName !== "") {

                axios
                    .post(`${appConfig.BaseURL}/api/AreasPlacement`, values)
                    .then((res) => {
                        isSuccess = true;
                    })
                    .catch((res) => {
                        isSuccess = false;
                        let error = res.response.data.errorList;
                        console.log("res", res)
                        let arr = error?.map((item) => t(item));
                        let msg = arr.join(" \n ");
                        console.log("msg", msg);
                        Swal({
                            text: msg,
                            icon: "error",
                            button: t("باشه"),

                            className: "small-text",
                        });
                    }).finally(() => {
                        if (isSuccess) {
                            setLoading(false)
                            closeModalAndReload();
                        }
                    })
            }
        },
    })


    return (
        <>
            {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', with: '100%' }}>
                <CircularProgress />
            </div> :
                <>
                    <div className="form-design" style={{ direction: i18n.dir() }} >
                        <div className="row">

                            <div className="col-lg-6 col-md-6 col-6" style={{ width: "100%" }} >
                                <div className="title ">
                                    <span>{t("نام ناحیه")}</span>
                                </div>
                                <div>

                                    <input type="text" name="displayName" id="displayName" onChange={(e) => {
                                        if (!!createModalData.current) {
                                            formik.setFieldValue("parentId", createModalData?.current?.areasPlacementId)
                                        }
                                        else {
                                            formik.setFieldValue("parentId", levelOfNode?.areasPlacementId)
                                        }
                                        formik.setFieldValue("displayName", e.target.value)
                                    }} />
                                </div>
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
                    </div></>

            }

        </>
    )
}

export default AddArea
