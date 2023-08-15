import { useTheme } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FeatureGroup, MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from "leaflet";
import { EditControl } from 'react-leaflet-draw';
import * as turf from "@turf/turf";
import Swal from 'sweetalert2'
import { Button } from '@mui/material';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';

const AddAreaCoordinates = ({ child, parent, zoom, center, sameParentFeature, handleClose, newArea, selectedCoordinates, areasPlacementId }) => {

    const appConfig = window.globalConfig;
    const [onChange, setOnChange] = useState();
    const [load, setLoad] = useState(false);
    const [areas, setAreas] = useState([])
    const [intersection, setIntersection] = useState([])
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const [refMap, setRefMap] = useState(null)
    // const [intersectionRef, setIntersectionRef] = useState()
    const [loading, setLoading] = useState(false);
    const [editedArea, setEditedArea] = useState()
    let editableFG = null
    let leafletGeoJSON;
    const [overlap, setOverlap] = useState(false);
    const [send, setSend] = useState([]);
    let sendd;
    const [edit, setEdit] = useState(false);
    const [Within, setWithin] = useState(true)

    let areasRef = useRef()
    areasRef.current = areas


    let intersectionRef = useRef()




    function onFeatureGroupReady(reactFGref) {
        console.log("onjaaaaaaaaaaaINTER", intersection)
        console.log("onjaaaaaaaaaaaAREAA", areas)
        if (refMap === null && !load && child !== null) {
            console.log("innnnnnnnnnnnnnnnnnnnnnnnnn")
            leafletGeoJSON = new L.GeoJSON(child);
            leafletGeoJSON.eachLayer(layer => {
                layer.setStyle({ color: "#1890ff", fillColor: "#1890ff", weight: 5, zIndex: 9999 })
                reactFGref?.addLayer(layer);
                setAreas([layer.feature])

            });
            console.log("reactFGref++++++", reactFGref)
            setRefMap(reactFGref)
            editableFG = reactFGref
            setLoad(true)
        }
    }
    console.log("refMap++++++", refMap)
    function onFeatureGroupReadyParent(reactFGref) {
        leafletGeoJSON = new L.GeoJSON(parent);
        leafletGeoJSON.eachLayer(layer => {
            layer.setStyle({ color: "#1890ff", fillColor: "none", weight: 5 })
            reactFGref?.addLayer(layer);
        });
    }

    function onFeatureGroupReadyIntersection(reactFGref) {
        console.log("injaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2INTER", intersection)
        console.log("injaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2AREA  ", areas)


        if (intersection.length) {

            leafletGeoJSON = new L.GeoJSON(intersection, { color: 'red' });
            leafletGeoJSON.eachLayer(layer => {
                layer.setStyle({ color: "red", fillColor: "red", weight: 5 })
                reactFGref?.addLayer(layer);
            });
            intersectionRef.current = reactFGref
            // setIntersectionRef(reactFGref)
            console.log("intersectionRef.current-----------------  ", intersectionRef.current)
        }
    }
    console.log("intersectionRef//////////////////", intersectionRef.current)
    function onFeatureGroupReadySameParent(reactFGref) {

        leafletGeoJSON = new L.GeoJSON(sameParentFeature, { weight: 5, dashArray: [12, 12], color: '#ffffff' });
        leafletGeoJSON.eachLayer(layer => {
            layer.setStyle({ color: "#1890ff", fillColor: "none", weight: 5 })
            reactFGref?.addLayer(layer);
        });
    }
    function _onChange() {
        if (!editableFG || !onChange) {
            return;
        }
        const geojsonData = editableFG.leafletElement.toGeoJSON()
        setOnChange(geojsonData)

    }
    function onEdited(e) {
        _onChange();
        let type = 'Polygon';
        let layer = e?.layers?._layers[Object.keys(e?.layers?._layers)[0]];
        let temp = {}
        temp = {
            type: "Feature",
            properties: {},
            geometry: {
                type: type,
                coordinates: layer._latlngs
            }
        }

        setAreas([temp])

    }
    function onCreated(e) {
        let type = 'Polygon';
        let layer = e.layer;
        let temp = {}
        console.log("_onCreated: something else created:", type, e?.layer._latlngs);
        console.log('areasRef----------', areasRef)
        console.log('areas----------', areas)
        console.log('areas.length === 0------', areas.length === 0)
        // if (areas.length === 0) {
        //     console.log('if-----')
        temp = {
            type: "Feature",
            properties: {},
            geometry: {
                type: type,
                coordinates: [e?.layer?._latlngs[0].map(item => [item.lng, item.lat])]
            }
        }
        setAreas([temp])


        if (intersection.length < 1) {
            e?.layer?._latlngs?.map((item) => {
                sendd = item.map((l) => {
                    return {
                        coordinatesAreasPlacementId: 0,
                        placementId: areasPlacementId,
                        lat: `${l.lat}`,
                        lng: `${l.lng}`
                    }
                })
            })
            setSend(sendd)
        }
        _onChange();
        // createData();
    }
    function onDeleted(e) {
        setEdit(true)
        let numDeleted = 0;
        e?.layers?.eachLayer(layer => {
            numDeleted += 1;
        });

        console.log(`onDeleted: removed ${numDeleted} layerseeeeeeeeeeeeee`, e);
        console.log(`areasRef.current`, areasRef.current);

        // let temp = areasRef.current
        // Object.keys(e?.layers?._layers).forEach((item) => {
        //     let deletedLayer = e?.layers?._layers[item]._latlngs[0].map(item => ([item.lng, item.lat]))
        //     temp = temp.filter((p) => {
        //         return !arrayEquals(p.geometry.coordinates[0].flat(), deletedLayer.flat())
        //     })
        // })

        // let geo;
        // if (numDeleted === areas.length) {
            setAreas([])
            clearintersection()
            setIntersection([])

        // }
        // else {
        //     setAreas(temp)
        //     clearintersection()
        //     // setIntersection([])
        //     _onChange();
        // }
    };
    console.log("areaaaaaaaaaaaaaa", areas)
    console.log("intrssssssssssss", intersection)
    function onEditStart(e) {
        console.log("onEditStart", e);
        setEdit(true)
    };
    function onMounted(drawControl) {
        console.log("onMounted", drawControl);
    }
    function onDeleteStart(e) {
        console.log("onDeleteStart", e);

    };
    function onEditStop(e) {
        console.log("onEditStop", e);
        if (intersectionRef.current) {
            let mapp = intersectionRef.current
            const drawnItems = mapp?._layers;
            clearintersection();
            console.log(intersection)
        }

    };
    function onDeleteStop(e) {
        console.log("onDeleteStop", e);
    };
    useEffect(() => {
        if (areas.length > 1) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: t('برای فیلد مورد نظر یک منطقه موجود است'),
                text: t("لطفا ابتدا منطقه موجود را حذف کنید"),
                confirmButtonColor: "#0084ff",
                confirmButtonText: t("تایید")
            })
        } else {

            if (areas.length) {console.log(":???????????????????????1111111111")
                let geo
                if (!Array.isArray(areas[0]?.geometry?.coordinates[0][0])) {
                    geo = {
                        type: 'Polygon',
                        coordinates: [areas[0]?.geometry?.coordinates[0]?.map(item => [item?.lng, item?.lat])]

                    }
                } else {
                    geo = {
                        type: 'Polygon',

                        coordinates: [areas[0]?.geometry?.coordinates[0]]
                    }
                }


                let areaTemp = {
                    type: "Feature",
                    properties: { edit: false },
                    geometry: geo
                }
                setEditedArea(areaTemp)
                let temp = []
                let booleanOverlap = false;
                let booleanWithin = true;
                if (!!sameParentFeature) {
                    sameParentFeature?.forEach((a) => {
                        if (a?.features[0]?.geometry?.coordinates[0]?.length) {

                            var intersection = turf.intersect(areaTemp, a?.features[0]);
                            temp.push(intersection)
                        }
                    })

                }
                if (!!parent) {
                    parent?.forEach((p) => {
                        if (!!p?.features[0]?.geometry?.coordinates[0]?.length) {
                            booleanOverlap = turf.booleanOverlap(areaTemp, p?.features[0])
                            booleanWithin = turf.booleanWithin(areaTemp, p?.features[0])
                            setOverlap(booleanOverlap)
                            setWithin(booleanWithin)
                        }
                    })
                }


                if (!temp.filter(Boolean).length) {
                    console.log(":???????????????????????22222222222")
                    if (intersectionRef.current) {
                        clearintersection()
                        setIntersection([])
                    }
                }
                else {
                    console.log(":???????????????????????3")
                    console.log("temp.filter(Boolean)xxxxxxxxxxx", temp.filter(Boolean))
                    setIntersection(temp.filter(Boolean))
                    if (intersectionRef.current) {
                        console.log("intersectionRef.currentxxxxxxxxxxx", intersectionRef.current)

                        clearintersection()

                        console.log("intersectionRef.current222xxxxxxxx", intersectionRef.current)
                        // leafletGeoJSON = new L.GeoJSON(temp.filter(Boolean), { color: 'red' });
                        // leafletGeoJSON.eachLayer(layer => {
                        //     layer.setStyle({ color: "red", fillColor: "red", weight: 5 })
                        //     intersectionRef.current?.addLayer(layer);
                        // });
                        console.log("intersectionRef.current666666666xxxxxxxx", intersectionRef.current)

                    }
                }
            }
            else if (intersectionRef.current) {
                clearintersection()
                setIntersection([])
                setWithin(false)
            }
            else {

                setIntersection([])
                setWithin(false)
            }
        }
    }, [areas])

    function clearintersection() {

        // setIntersection([])
        let mapp = intersectionRef.current
        console.log("mapp", mapp)
        const drawnItems = mapp?._layers;
        if (Object?.keys(drawnItems)?.length) {
            console.log("Object?.keys(drawnItems)", Object?.keys(drawnItems))
            Object?.keys(drawnItems)?.forEach((layerid, index) => {
                const layer = drawnItems[layerid];
                console.log('clearintersection layer', layer)

                mapp?.removeLayer(layer);
            });

        }
        intersectionRef.current=mapp
        console.log("mapp2222222222", intersectionRef.current)
    }

    function submit() {
        if (areas.length > 1) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: t('برای فیلد مورد نظر یک منطقه موجود است'),
                text: t("لطفا ابتدا منطقه موجود را حذف کنید"),
                confirmButtonColor: "#0084ff",
                confirmButtonText: t("تایید")
            })
        } else {
            if (!!intersectionRef.current) {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: t('برای فیلد مورد نظر همپوشانی موجود است'),
                    text: t("لطفا ابتدا همپوشانی موجود را حذف یا ویرایش کنید"),
                    confirmButtonColor: "#0084ff",
                    confirmButtonText: t("تایید")
                })
            } else {
                let isSuccess = false;
                if (!overlap && Within) {
                    if (!edit) {
                        setLoading(true)
                        axios
                            .post(`${appConfig.BaseURL}/api/CoordinatesAreasPlacement/AddRange`, send)
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
                                    parent = null;
                                    child = null;
                                    handleClose()
                                    setLoading(false)

                                }
                            })
                    }
                    else {

                        let sendData = []
                        sendData = editedArea?.geometry?.coordinates[0].map((item) => {
                            return {
                                coordinatesAreasPlacementId: 0,
                                placementId: areasPlacementId,
                                lat: `${item[1]}`,
                                lng: `${item[0]}`
                            }
                        })

                        axios.put(`${appConfig.BaseURL}/api/CoordinatesAreasPlacement/UpdateRange/${areasPlacementId}`, sendData)
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
                                    handleClose()
                                    setEdit(false)
                                }
                            })
                    }
                }
                else {
                    setLoading(false)
                    Swal.fire({
                        icon: 'error',
                        title: t('لطفا منطقه خود را خارج از منطقه والد رسم نکنید'),
                        text: t("لطفا ابتدا بیرون زدگی موجود را حذف یا ویرایش کنید"),
                        confirmButtonColor: "#0084ff",
                        confirmButtonText: t("تایید")
                    })
                }
            }
        }

    }

    function onDrawStart(e) {

        console.log('onDrawStart', e)
    }


    return (
        <div style={{ width: "100%" }} className={`${areas.length>0?'disable-add':''}`}>
            <div className="col-lg-12 col-md-12 col-12" >
                <MapContainer
                    id='map'
                    center={center}
                    zoom={zoom}
                    style={{ height: "70vh", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FeatureGroup
                        ref={(reactFGref) => { onFeatureGroupReadySameParent(reactFGref) }}
                    >
                    </FeatureGroup>
                    <FeatureGroup
                        ref={(reactFGref) => { onFeatureGroupReadyParent(reactFGref) }}
                    >
                    </FeatureGroup>

                    <FeatureGroup
                        ref={(reactFGref) => { onFeatureGroupReadyIntersection(reactFGref) }}
                    >
                    </FeatureGroup>
                    <FeatureGroup
                        ref={(reactFGref) => { onFeatureGroupReady(reactFGref) }}
                    >
                        <MapContent zoom={zoom} center={center} selectedCoordinates={selectedCoordinates} />
                        <EditControl
                            position="topright"
                            onEdited={onEdited}
                            onCreated={onCreated}
                            onDrawStart={onDrawStart}
                            onDeleted={onDeleted}
                            onMounted={onMounted}
                            onEditStart={onEditStart}
                            onEditStop={onEditStop}
                            onDeleteStart={onDeleteStart}
                            onDeleteStop={onDeleteStop}

                            draw={{
                                circlemarker: false,
                                rectangle: false,
                                polyline: false,
                                circle: false,
                                marker: false,
                                polygon: true
                            }}
                        />
                    </FeatureGroup>

                </MapContainer>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row-reverse",
                    marginTop: "20px"
                }}>
                <div className={`d-flex justifyContent-center ${i18n.dir == 'ltr' ? 'ltr' : 'rtl'}`}>
                    <LoadingButton
                        variant="contained"
                        color="success"
                        type="button"
                        disabled={areas.length > 0 ? false : true}
                        onClick={() => {
                            setLoading(true)
                            submit()
                        }}
                        loading={loading}
                    >
                        {t("تایید")}
                    </LoadingButton>
                </div>
                <div style={{ marginRight: "20px", marginLeft: "20px" }}>
                    <Button variant="contained" color='error' onClick={handleClose}
                        style={{
                            width: "60px",

                        }} >
                        {t("بازگشت")}
                    </Button>
                </div>
            </div>
        </div >
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

export default AddAreaCoordinates
