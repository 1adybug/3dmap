import { Fullscreen, LineLayer, Map, PolygonLayer, Scene } from "@antv/l7"
import qjp from "./qjp.json"
import "./style.css"

async function main() {
    const scene = new Scene({
        id: "map",
        map: new Map({
            style: "blank",
            center: [119.0616945, 33.517622],
            pitch: 32,
            zoom: 10,
            rotateEnable: false
        }),
        logoVisible: false,
        antialias: true,
        stencil: true
    })

    scene.setBgColor("#142E5E")

    scene.setMapStatus({
        // rotateEnable: false,
        // dragEnable: false,
        // zoomEnable: false
    })

    await new Promise(resolve => scene.on("loaded", resolve))

    const fullscreen = new Fullscreen({
        btnText: "全屏",
        exitBtnText: "退出全屏",
        style: "background-color: transparent; color: white;"
    })

    scene.addControl(fullscreen)

    const data = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "Polygon",
                    coordinates: [qjp]
                }
            }
        ]
    }

    const layer = new PolygonLayer().source(data).shape("extrude").size(10000).color("#1E67F2").style({
        heightfixed: true,
        sourceColor: "rgba(255, 255, 255, 0.1)",
        targetColor: "red"
        // topsurface: false,
        // sidesurface: false,
        // mapTexture: "/a.jpg"
    })

    layer.active({
        color: "green",
        mix: 0.6
    })

    scene.addLayer(layer)

    const layer2 = new LineLayer()
        .source(data)
        .shape("line")
        .size(1)
        .color("#1E67F2")
        .style({
            raisingHeight: 10000
        })
        .animate({
            interval: 0.3333333333,
            duration: 1,
            trailLength: 1
        })

    scene.addLayer(layer2)
}

main()
