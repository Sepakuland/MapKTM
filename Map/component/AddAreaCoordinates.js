import { useTheme } from '@emotion/react';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FeatureGroup, MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from "leaflet";
import { EditControl } from 'react-leaflet-draw';
import * as turf from "@turf/turf";
import Swal from 'sweetalert2'
import { Button } from '@mui/material';
import axios from 'axios';

const AddAreaCoordinates = ({ child, parent, zoom, center, sameParentFeature, handleClose, newArea, selectedCoordinates, areasPlacementId }) => {

    const appConfig = window.globalConfig;
    const [onChange, setOnChange] = useState();
    const [load, setLoad] = useState(false);
    const [areas, setAreas] = useState([])
    const [intersection, setIntersection] = useState([])
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const [refMap, setRefMap] = useState()
    const [intersectionRef, setIntersectionRef] = useState()
    const [editedArea, setEditedArea] = useState()
    let editableFG = null
    let leafletGeoJSON;
    const [overlap, setOverlap] = useState(false);
    const [send, setSend] = useState([]);
    let sendd;
    const [edit, setEdit] = useState(false);

    function onFeatureGroupReady(reactFGref) {
        if (editableFG === null && !load) {
            console.log('child----------------------------', child)
            leafletGeoJSON = new L.GeoJSON(child);
            leafletGeoJSON.eachLayer(layer => {
                layer.setStyle({ color: "#1890ff", fillColor: "#1890ff", weight: 5, zIndex: 9999 })
                reactFGref?.addLayer(layer);
                setAreas(layer.feature)
            });
            console.log('leafletGeoJSON---------', leafletGeoJSON)
            setRefMap(reactFGref)
            editableFG = reactFGref
            setLoad(true)
        }
    }

    function onFeatureGroupReadyParent(reactFGref) {

        leafletGeoJSON = new L.GeoJSON(parent);
        leafletGeoJSON.eachLayer(layer => {
            layer.setStyle({ color: "#1890ff", fillColor: "none", weight: 5 })
            reactFGref?.addLayer(layer);
        });
    }
    function onFeatureGroupReadyIntersection(reactFGref) {
        if (intersection.length) {
            console.log("intersection--------------------------", intersection)
            leafletGeoJSON = new L.GeoJSON(intersection, { color: 'red' });
            leafletGeoJSON.eachLayer(layer => {
                layer.setStyle({ color: "red", fillColor: "red", weight: 5 })
                reactFGref?.addLayer(layer);
            });
            setIntersectionRef(reactFGref)
        }
    }
    function onFeatureGroupReadySameParent(reactFGref) {
        leafletGeoJSON = new L.GeoJSON(sameParentFeature, { weight: 5, dashArray: [12, 12], color: '#ffffff' });
        leafletGeoJSON.eachLayer(layer => {
            layer.setStyle({ color: "#1890ff", fillColor: "transparent", weight: 5 })
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
        let temp = {}
        let numEdited = 0;
        let type = e.layerType;
        e.layers.eachLayer(layar => {
            numEdited += 1;
        });
        console.log(`onEdited: edited ${numEdited} layers`, e)
        console.log(`......................`, e.layers._layers[0])

        temp = {
            id: e?.layers?._layers?._leaflet_id,
            type: type,
            coordinates: e?.layers?._layers?._latlngs
        }
        console.log("tttttttttttttttttttttttttttttttttttttttttt", temp)
        setAreas(temp)
        if (intersection.length < 1) {
            console.log("intersectionsssssssssssssssssssssssssssssssssss", e?.layer?._latlngs)

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
        createData();
        setEdit(true);
        // clearintersection();
    }
    function onCreated(e) {
        let type = e.layerType;
        let layer = e.layer;
        let temp = {}
        console.log("_onCreated: something else created:", type, e?.layer._latlngs);
        temp = {
            id: e?.layer?._leaflet_id,
            type: type,
            coordinates: e?.layer?._latlngs
        }
        setAreas(temp)

        if (intersection.length < 1) {
            console.log("intersectionsssssssssssssssssssssssssssssssssss", e?.layer?._latlngs)

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
        createData();
    }
    function onDeleted(e) {
        let numDeleted = 0;
        e?.layers?.eachLayer(layer => {
            numDeleted += 1;
        });
        console.log(`onDeleted: removed ${numDeleted} layerseeeeeeeeeeeeee`, e);
        _onChange();
    };
    function createData() {
        let temp = []
        editableFG?._layers && Object.keys(editableFG?._layers)?.forEach(item => {
            let type = 'Polygon'
            temp.push({
                type: type,
                coordinates: editableFG?._layers[item]?._latlngs
            })
        })
        setAreas(temp)
    }
    function onEditStart(e) {
        console.log("onEditStart", e);
    };
    function onMounted(drawControl) {
        console.log("onMounted", drawControl);
    }
    function onDeleteStart(e) {
        console.log("onDeleteStart", e);
    };
    function onEditStop(e) {
        console.log("onEditStop", e);
        createData()

        if (intersectionRef) {
            // setIntersection([])
            let mapp = intersectionRef
            const drawnItems = mapp?._layers;

            clearintersection();
        }

    };
    function onDeleteStop(e) {
        console.log("onDeleteStop", e);
        console.log("editableFG", editableFG);

        createData()
    };
    useEffect(() => {

        if (areas.length > 1) {

            Swal.fire({
                icon: 'error',
                title: t('برای فیلد مورد نظر یک منطقه موجود است'),
                text: t("لطفا ابتدا منطقه موجود را حذف کنید"),
                confirmButtonColor: "#0084ff",
                confirmButtonText: t("تایید")
            })

        } else {
            if (areas.length) {
                let geo = {
                    ...areas[0],
                    coordinates: [areas[0]?.coordinates[0]?.map(item => [item?.lng, item?.lat])]
                }
                let areaTemp = {
                    type: "Feature",
                    properties: { edit: false },
                    geometry: geo

                }

                setEditedArea(areaTemp)
                let temp = []
                let booleanOverlap;
                sameParentFeature?.forEach((a) => {
                    if (a?.features[0]?.geometry?.coordinates[0]?.length) {
                        // console.log("a...................", a?.features[0])
                        var intersection = turf.intersect(areaTemp, a?.features[0]);
                        temp.push(intersection)
                    }
                })

                parent?.forEach((p) => {
                    if (!!p?.features) {
                        booleanOverlap = turf.booleanOverlap(areaTemp, p?.features[0])
                        console.log("booleanOverlap...................", booleanOverlap)
                    }
                })
                setOverlap(booleanOverlap)
                setIntersection(temp.filter(Boolean))
                if (!temp.filter(Boolean).length) {
                    console.log('clearintersection if')
                    if (intersectionRef) {
                        clearintersection()
                    }
                }
                else {
                    console.log('clearintersection else', intersectionRef)
                    if (intersectionRef) {
                        console.log('clearintersection else if')
                        clearintersection()
                        leafletGeoJSON = new L.GeoJSON(temp.filter(Boolean), { color: 'red' });
                        leafletGeoJSON.eachLayer(layer => {
                            layer.setStyle({ color: "red", fillColor: "red", weight: 5 })
                            intersectionRef?.addLayer(layer);
                        });
                    }
                }
            }
            else if (intersectionRef) {
                console.log('clearintersection elseeeeeeeeeeeeee')
                clearintersection()

            }
        }
    }, [areas])

    function clearintersection() {
        console.log('mapp........................')
        setIntersection([])
        let mapp = intersectionRef
        const drawnItems = mapp?._layers;

        if (Object.keys(drawnItems).length) {
            Object.keys(drawnItems).forEach((layerid, index) => {

                const layer = drawnItems[layerid];
                mapp?.removeLayer(layer);
            });

        }

    }
    function submit() {
        if (!!intersectionRef) {
            Swal.fire({
                icon: 'error',
                title: t('برای فیلد مورد نظر همپوشانی موجود است'),
                text: t("لطفا ابتدا همپوشانی موجود را حذف یا ویرایش کنید"),
                confirmButtonColor: "#0084ff",
                confirmButtonText: t("تایید")
            })
        } else {

            let isSuccess = false;
            if (!overlap) {
                if (!edit) {
                    console.log("editeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", edit)
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
                            }
                        })
                }
            }
            else {
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


    return (
        <div style={{ width: "100%" }}>
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
                        ref={(reactFGref) => { onFeatureGroupReadyParent(reactFGref) }}
                    >
                    </FeatureGroup>
                    <FeatureGroup
                        ref={(reactFGref) => { onFeatureGroupReadySameParent(reactFGref) }}
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
                    <FeatureGroup
                        ref={(reactFGref) => { onFeatureGroupReadyIntersection(reactFGref) }}
                    >
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
                <div>
                    <Button variant="outlined" color='success' onClick={() => { submit() }}
                        style={{
                            width: "15px",
                        }}>
                        {t("تایید")}
                    </Button>
                </div>
                <div>
                    <Button variant="outlined" color='error' onClick={handleClose}
                        style={{
                            width: "15px",
                            marginRight: "10px"
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
