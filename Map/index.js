import React, { useRef, useState, useEffect } from 'react'
import { FeatureGroup, MapContainer, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useTheme } from '@emotion/react';
import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, Paper } from '@mui/material';
import L from "leaflet";
import { ContextMenu, TreeView } from 'devextreme-react';
import { useTranslation } from 'react-i18next';
import AddArea from './component/AddArea';
import axios from 'axios';
import { Item } from 'devextreme-react/accordion';
import AddAreaCoordinates from './component/AddAreaCoordinates';
import EditArea from './component/EditArea';
import Swal from 'sweetalert2';


L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png"
});

const AreasPlacement = () => {
    const style = {
        color: '#006400',
        weight: 5,
        opacity: 0.65
    }
    let leafletGeoJSON;
    let leafletFG;
    let editableFG = null
    let coordinates = []
    const createModalData = useRef();
    const updateModalData = useRef();
    const deleteData = useRef();
    const appConfig = window.globalConfig;
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const [zoom, setZoom] = useState(5)
    const [center, setCenter] = useState([35.69972115222563, -308.66168260574347])
    const [load, setLoad] = useState(false);
    const [refMap, setRefMap] = useState()
    const [edit, setEdit] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [Add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentFeature, setCurrentFeature] = useState(null);
    const [childFeature, setChildFeature] = useState();
    const [parentFeature, setParentFeature] = useState();
    const [sameParentFeature, setSameParentFeature] = useState();
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [areasPlacementId, setAreasPlacementId] = useState();
    const [expandedNode, setExpandedNode] = useState([]);
    const [expandedNodeStatus, setExpandedNodeStatus] = useState([]);
    const [datasource, setdatasource] = useState([]);
    const [levelOfNode, setLevelOfNode] = useState();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setCurrent([])
        setAdd(false);
        setEdit(false);
        setDelete(false);
        getData();
        setParentFeature(null)
        setCurrentFeature(null)
        let mapp = refMap

        if (Object.keys(mapp?._layers).length) {
            Object.keys(mapp?._layers).forEach((layerid, index) => {
                const layer = mapp?._layers[layerid];
                mapp.removeLayer(layer);
            });

        }
        setRefMap(mapp)

    };
    function closeModalAndReload() {
        setCreateModalOpen(false)
        setUpdateModalOpen(false)
        getData()
    }

    useEffect(() => {
        let expTemp = datasource.map((item) => ({
            AreasPlacementId: item.AreasPlacementId,
            expanded: item?.expanded || false
        }))
        setExpandedNodeStatus(expTemp)
    }, [expandedNode])
    const getData = () => {
        setLoading(true)
        axios.get(`${appConfig.BaseURL}/api/AreasPlacement`)
            .then((res) => {
                let temp = res.data.data.map((item) => {
                    let t = expandedNodeStatus.filter(f => f.AreasPlacementId == item.AreasPlacementId)[0]
                    if (item.AreasPlacementId == 0) {
                        return {
                            ...item,
                            expanded: true
                        }
                    }
                    else {
                        return {
                            ...item,
                            expanded: t?.expanded || false
                        }
                    }
                })
                let x = temp.filter(a => a.level < 5 && a.level > 0 && a.haveCoordinates == false)
                let y;
                x.forEach(item => {
                    y = temp.filter(f => f.placementParentId !== item.areasPlacementId)
                    temp = y;
                })
                setdatasource(temp)
            }).catch((error) => error)
            .finally(() => setLoading(false));
    }
    useEffect(() => {
        getData()
    }, [])


    /* تابع زیر طوری نوشته شده که با کلیک روی هر منطقه ی موجود 
    در درخت مناطق خود آن منطقه و مناطق والد و مناطق فرزند آن نمایش داده شود  */
    async function itemClick(e) {
        setAreasPlacementId(e.itemData.areasPlacementId)
        let features;
        let Parentfeatures;
        let Parents;
        let Parentcoordinates;
        let Children;
        let ChildrenFreatures;
        let ChildrenCoordinates;
        let SameParent;
        let SameParentFeature;
        let SameParentCoordinates;
        let mapp = refMap
        const drawnItems = mapp?._layers;
        await axios.get(`${appConfig.BaseURL}/api/CoordinatesAreasPlacement/GetById${e.itemData.areasPlacementId}`)
            .then((res) => {
                coordinates = res?.data?.data?.map((item) => { return [parseFloat(item?.lng), parseFloat(item?.lat)] })
                if (coordinates.length > 0) {
                    features = [
                        {
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "Polygon",
                                coordinates: [coordinates]
                            }
                        },
                    ]
                    setCurrent([coordinates])

                    setAdd(false)
                    setEdit(true)
                    setDelete(true)
                }
                else {
                    setAdd(true)
                    setEdit(false)
                    setDelete(false)
                    setCurrent([])
                }

            }).finally(() => {
                setLoading(false)
            })
        let geo = {
            type: "FeatureCollection",
            features: features
        }
        /* -------------------------------------------------------------------------- */
        /*                       get areas that have same Parent                      */
        /* -------------------------------------------------------------------------- */
        setLoading(true)
        axios.get(`${appConfig.BaseURL}/api/AreasPlacement/GetSameParentFeature/${e.itemData.placementParentId}`)
            .then((res) => {
                SameParent = res.data.data;

                SameParentFeature = SameParent.map((item) => {
                    if (item.level > 0 && item.areasPlacementId !== e?.itemData.areasPlacementId) {
                        SameParentCoordinates = item?.coordinatesAreasPlacementDTOs?.map((c) => {
                            return [parseFloat(c?.lng), parseFloat(c?.lat)]
                        })
                        return [{
                            type: "Feature",
                            properties: { edit: false },
                            geometry: {
                                type: "Polygon",
                                coordinates: [SameParentCoordinates]
                            }
                        }]
                    }
                })
                let SameParentGeo = SameParentFeature.map((item, index) => {
                    if (!!item) {
                        return {
                            type: "FeatureCollection",
                            features: item
                        }
                    }
                    return false
                }).filter(Boolean)
                leafletGeoJSON = new L.GeoJSON(SameParentGeo, { weight: 5, color: '#ffffff' });
                leafletGeoJSON.eachLayer(layer => {
                    layer.setStyle({ color: "#1890ff", fillColor: "none", weight: 5 })
                    mapp?.addLayer(layer);
                });
                setSameParentFeature(SameParentGeo)
            })
            .finally(() => {
                setLoading(false)
            })

        if (!!coordinates.length) {
            /* -------------------------------------------------------------------------- */
            /*                  calculate center of selected areas                        */
            /* -------------------------------------------------------------------------- */

            /* -------- if the number of layers is bigger than 1 then manage layers ----- */
            if (Object.keys(drawnItems).length) {
                Object.keys(drawnItems).forEach((layerid, index) => {
                    const layer = drawnItems[layerid];
                    mapp.removeLayer(layer);
                });

            }
            leafletGeoJSON = new L.GeoJSON(geo);
            leafletGeoJSON.eachLayer(layer => {
                layer.setStyle({ color: "#1890ff", fillColor: "#1890ff", weight: 5 })
                mapp?.addLayer(layer);
            });
            setCurrentFeature(geo)
            if (e?.itemData?.level > 0) {
                setLoading(true)
                axios.get(`${appConfig.BaseURL}/api/AreasPlacement/GetParentFeature/${e.itemData.areasPlacementId}`)
                    .then((res) => {
                        Parents = res.data.data;
                        Parentfeatures = Parents.map((item) => {
                            if (item.level > 0) {
                                Parentcoordinates = item?.coordinatesAreasPlacementDTOs?.map((c) => {
                                    return [parseFloat(c?.lng), parseFloat(c?.lat)]
                                })
                                return [{
                                    type: "Feature",
                                    properties: { edit: false },
                                    geometry: {
                                        type: "Polygon",
                                        coordinates: [Parentcoordinates]
                                    }
                                }]
                            }
                        })

                        let ParentGeo = Parentfeatures.map((item, index) => {
                            if (!!item) {
                                return {
                                    type: "FeatureCollection",
                                    features: item
                                }
                            }
                            return false
                        }).filter(Boolean)
                        leafletGeoJSON = new L.GeoJSON(ParentGeo, { weight: 5, dashArray: [10, 10], color: '#ffffff' });
                        leafletGeoJSON.eachLayer(layer => {
                            layer.setStyle({ color: "#1890ff", fillColor: "none", weight: 5 })
                            mapp?.addLayer(layer);
                        });
                        setParentFeature(ParentGeo)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
                /* -------------------------------------------------------------------------- */
                /*                      get coordinates of Area's Children                    */
                /* -------------------------------------------------------------------------- */
                if (e.itemData?.level < 4) {
                    setLoading(true)
                    axios.get(`${appConfig.BaseURL}/api/AreasPlacement/GetChildrenFeature/${e.itemData.areasPlacementId}`)
                        .then((res) => {
                            Children = res.data.data;
                            ChildrenFreatures = Children.map((item) => {
                                if (item.level > 0) {
                                    ChildrenCoordinates = item?.coordinatesAreasPlacementDTOs?.map((c) => {
                                        return [parseFloat(c?.lng), parseFloat(c?.lat)]
                                    })
                                    return [{
                                        type: "Feature",
                                        properties: { edit: false },
                                        geometry: {
                                            type: "Polygon",
                                            coordinates: [ChildrenCoordinates]
                                        }
                                    }]
                                }
                            })
                            let childrenGeo = ChildrenFreatures.map((item, index) => {
                                if (!!item) {
                                    return {
                                        type: "FeatureCollection",
                                        features: item
                                    }
                                }
                                else {
                                    return false
                                }
                            }).filter(Boolean)
                            leafletGeoJSON = new L.GeoJSON(childrenGeo, { weight: 5, dashArray: [10, 10], color: '#ffffff' });
                            leafletGeoJSON.eachLayer(layer => {
                                layer.setStyle({ color: "#1890ff", fillColor: "none", weight: 5 })
                                mapp?.addLayer(layer);
                            });
                            setChildFeature(childrenGeo)
                        })
                        .finally(
                            setLoading(false)
                        )
                }



            }
        }
        else {
            setCurrentFeature(null);
            Object.keys(drawnItems).forEach((layerid, index) => {
                const layer = drawnItems[layerid];
                mapp.removeLayer(layer);
            });
            if (e?.itemData?.level >= 1) {
                setLoading(true)
                await axios.get(`${appConfig.BaseURL}/api/AreasPlacement/GetParentFeature/${e.itemData.areasPlacementId}`)
                    .then((res) => {
                        Parents = res.data.data;
                        Parentfeatures = res?.data?.data.map((item) => {
                            if (item.level > 0) {
                                Parentcoordinates = item?.coordinatesAreasPlacementDTOs?.map((c) => {
                                    return [parseFloat(c?.lng), parseFloat(c?.lat)]
                                })
                                return [{
                                    type: "Feature",
                                    properties: { edit: false },
                                    geometry: {
                                        type: "Polygon",
                                        coordinates: [Parentcoordinates]
                                    }
                                }]
                            }
                        })
                        let ParentGeo = Parentfeatures.map((item, index) => {
                            if (!!item) {
                                return {
                                    type: "FeatureCollection",
                                    features: item
                                }
                            }
                            return false
                        }).filter(Boolean)
                        if (Parentfeatures[Parentfeatures?.length - 1][0].geometry?.coordinates[0].length > 0) {
                            setCurrent([Parentfeatures[Parentfeatures?.length - 1][0].geometry?.coordinates[0]])
                        }
                        else {
                            setCurrent([])
                        }
                        setParentFeature(ParentGeo)
                        leafletGeoJSON = new L.GeoJSON(ParentGeo, { weight: 5, dashArray: [10, 10], color: '#ffffff' });
                        leafletGeoJSON.eachLayer(layer => {
                            layer.setStyle({ color: "#1890ff", fillColor: "none", weight: 5 })
                            mapp?.addLayer(layer);
                        });
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }

        }
        setRefMap(mapp)
        setLoad(true)
    }
    function onFeatureGroupReady(reactFGref) {
        if (editableFG === null && !load) {
            setRefMap(reactFGref)
            editableFG = reactFGref
            setLoad(true)
        }
    }
    /* -------------------------------------------------------------------------- */
    /*                    CRUD For Tree View    (AreasPlacement)                  */
    /* -------------------------------------------------------------------------- */
    function handleItemClick(e) {
        if (e?.event?.which === 3 || e?.event?.which === 1) {

            updateModalData.current = e?.itemData
            createModalData.current = e?.itemData
            deleteData.current = e?.itemData?.areasPlacementId
        }
    }
    function OpenCreateModal() {
        if ((!!createModalData && createModalData?.current?.level < 5) || levelOfNode.level < 5) {
            setCreateModalOpen(true)
        }
        else {
            setCreateModalOpen(false);
        }
    }
    function OpenUpdateModal() {
        if (updateModalData.current.level < 5) {
            setUpdateModalOpen(true)
        }
        else {
        }
    }
    /* -------------------------------------------------------------------------- */
    /*                     Delete Coordinates Of Selected Area                    */
    /* -------------------------------------------------------------------------- */
    const [isDeleted, setIsDeleted] = useState(false)
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {

            container: 'swalRTL'
        },
    });
    const deleteArea = () => {
        swalWithBootstrapButtons.fire({
            title: 'حذف شود؟',
            text: "شما در حال حذف یک منطقه می باشید...",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#009c12',
            cancelButtonColor: '#ff4d4f',
            confirmButtonText: 'بله',
            cancelButtonText: "خیر",


        }).then((result) => {
            if (result.isConfirmed) {
                let isSuccess;

                axios.delete(`${appConfig.BaseURL}/api/AreasPlacement/${deleteData.current}`)
                    .then((res) => {

                        setCurrent([])

                        getData()
                    }).catch((res) => {
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
                        })
                    })
                    .finally(() => {
                        editableFG = null
                        swalWithBootstrapButtons.fire(
                            'حذف شد!',
                            'منطقه مورد نظر حذف شد.',
                            'success'
                        )
                    });
            }
        })


    };
    function rightClickMenu(e) {
        if (e.itemIndex === 0) {
            OpenCreateModal()
        }
        if (e.itemIndex === 1) {
            OpenUpdateModal()
        }
        if (e.itemIndex === 2) {
            deleteArea()
        }
    }

    function DeleteCoordinates(e) {
        swalWithBootstrapButtons.fire({
            title: 'حذف شود؟',
            text: "شما در حال حذف یک منطقه می باشید...",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#009c12',
            cancelButtonColor: '#ff4d4f',
            confirmButtonText: 'بله',
            cancelButtonText: "خیر",


        }).then((result) => {

            if (result.isConfirmed) {
                let isSuccess;
                axios
                    .delete(`${appConfig.BaseURL}/api/CoordinatesAreasPlacement/DeleteRange/${areasPlacementId}`)
                    .then((res) => {
                        getData();
                        console.log('theeeeeeeeen', res)
                        setCurrentFeature(null)
                        setCurrent([])
                        setAdd(false);
                        setEdit(false);
                        setDelete(false);
                        setAreasPlacementId();
                        editableFG = null
                        let mapp = refMap
                        isSuccess = true;
                        if (Object.keys(mapp?._layers).length) {
                            Object.keys(mapp?._layers).forEach((layerid, index) => {
                                const layer = mapp?._layers[layerid];
                                mapp.removeLayer(layer);
                            });

                        }
                        setRefMap(mapp)
                    }).catch((res) => {
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
                        })
                    }).finally(() => {
                        swalWithBootstrapButtons.fire(
                            'حذف شد!',
                            'منطقه مورد نظر حذف شد.',
                            'success'
                        )
                    })

            }


        });
    }

    console.log('currentFeature......', currentFeature)

    return (
        <>
            <div style={{ backgroundColor: `${theme.palette.background.paper} `, padding: '20px' }} >
                <div className="row form-design">

                    <div className="col-lg-4 col-md-4 col-12">
                        <Paper style={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap"
                        }}
                            elevation={5} className="paper-pda">
                            <div className="col-lg-12 col-md-12 col-12" style={{ height: " 90%" }} >
                                {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', with: '100%' }}>
                                    <CircularProgress />
                                </div> : <TreeView
                                    dataStructure='plain'
                                    className={theme.palette.mode === "dark" && "dark-tree"}
                                    id="simple-treeview"
                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                    items={datasource}
                                    displayExpr="displayName"
                                    onItemExpanded={(e) => setExpandedNode(e.node)}
                                    onItemSelectionChanged={(e) => setLevelOfNode(e?.itemData)}
                                    itemRender={(e) =>
                                        <div class={e?.haveCoordinates ? 'green-item' : e.level === 0 ? 'black-item' : 'red-item'}>{e.displayName}</div>
                                    }
                                    selectByClick={true}
                                    selectionMode="single"
                                    keyExpr="areasPlacementId"
                                    parentIdExpr="placementParentId"
                                    onItemClick={(e) => {
                                        itemClick(e)
                                        handleItemClick()
                                    }}
                                    onItemContextMenu={handleItemClick}
                                    width={300}
                                >

                                </TreeView>
                                }

                                <ContextMenu
                                    target="#simple-treeview"
                                    onItemClick={rightClickMenu}
                                    rtlEnabled
                                >
                                    <Item text="جدید" icon="plus" />
                                    <Item text="ویرایش" icon="edit" />
                                    <Item text="حذف" icon="trash" />
                                </ContextMenu>
                            </div>

                            {Add && !edit && !Delete ?
                                <div className='d-flex justify-content-center' style={{ margin: "5px", width: "100%" }}>
                                    <Button variant='contained' color='info' style={{ width: "70px", height: "30px" }}
                                        onClick={() => {
                                            console.log("levelOfNode", levelOfNode)
                                            levelOfNode?.level === 0 ? OpenCreateModal() : handleClickOpen()
                                        }}>
                                        {t("تعریف")}
                                    </Button>
                                </div> :
                                !Add && edit && !Delete ? <div style={{ margin: "5px", height: "30px" }}>
                                    <Button variant='contained' color='warning' style={{ width: "70px" }} onClick={() => { handleClickOpen() }}>
                                        {t("ویرایش")}
                                    </Button>
                                </div> :
                                    !Add && !edit && !Delete ? <></> :
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                height: "10%",
                                                width: "100%"
                                            }}>
                                            <div style={{ margin: "5px" }}>
                                                <Button variant='contained' color='warning' style={{ width: "70px", height: "30px" }} onClick={() => { handleClickOpen() }}>
                                                    {t("ویرایش")}
                                                </Button>
                                            </div>
                                            <div style={{ margin: "5px" }}>
                                                <Button variant='contained' color='error' style={{ width: "70px", height: "30px" }}
                                                    onClick={(e) => DeleteCoordinates(e)}>
                                                    {t("حذف")}
                                                </Button>
                                            </div>
                                        </div>
                            }
                        </Paper>
                    </div>
                    <div className="col-lg-8 col-md-8 col-12">
                        <Paper elevation={2} className="paper-pda"
                            style={{ boxShadow: "1px 5px 8px #c3c3c3" }}>
                            <MapContainer
                                id='map'
                                center={center}
                                zoom={zoom}
                                style={{ height: "70vh", width: "100%" }}>

                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <MapContent zoom={zoom} center={center} selectedCoordinates={current} />
                                <FeatureGroup
                                    ref={(reactFGref) => { onFeatureGroupReady(reactFGref) }}
                                >
                                </FeatureGroup>
                            </MapContainer>
                        </Paper>
                    </div>
                </div>
            </div >
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={'xlg'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogContent >
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        <AddAreaCoordinates child={currentFeature} parent={parentFeature} sameParentFeature={sameParentFeature} areasPlacementId={areasPlacementId}
                            zoom={zoom} center={center} handleClose={handleClose} selectedCoordinates={current} />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog
                open={createModalOpen}
                onClose={closeModalAndReload}
                fullWidth={false}
                maxWidth={'md'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogContent >
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        <AddArea closeModalAndReload={closeModalAndReload} createModalData={createModalData} levelOfNode={levelOfNode} />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog
                open={updateModalOpen}
                onClose={closeModalAndReload}
                fullWidth={false}
                maxWidth={'md'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogContent >
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        <EditArea closeModalAndReload={closeModalAndReload} updateModalData={updateModalData} />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}
const MapContent = ({ zoom, center, selectedCoordinates }) => {
    const map = useMap()


    useEffect(() => {
        if (selectedCoordinates?.length) {
            map.fitBounds([selectedCoordinates[0].map((item) => ([item[1], item[0]]))])



        } else {
            map.flyTo(center, zoom)
        }


    }, [selectedCoordinates, center, zoom])


}

export default AreasPlacement

