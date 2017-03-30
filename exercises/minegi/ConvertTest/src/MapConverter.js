// Map information for Lambert conformal conic projection
const MAP_INFO = {
    // radius of map
    radiusOfMap: 6371.00877,
    // size of grid
    grid: 5,
    // standard latitude 1
    stdLat1: 30.0,
    // standard latitude 2
    stdLat2: 60.0,
    // original longitude
    orgLon: 126.0,
    // original latitude
    orgLat: 38.0,
};

// original x-axis
MAP_INFO.orgX = 210 / MAP_INFO.grid;
// original y-axis
MAP_INFO.orgY = 675 / MAP_INFO.grid;

/** PI for abbrev. */
const PI = Math.PI;
/** degree to radian */
const DEG_TO_RAD = PI / 180.0;

/**
 * Convert from longitude & latitude to (x, y) position.
 *
 * @param {number} lon longitude
 * @param {number} lat latitude
 */
const convertToPosition = (lon, lat) => {
    const projected = lccProjectionToGetPosition(lon, lat, MAP_INFO);
    if (projected !== null) {
        return {
            x: Math.floor((projected.x + 1.5)),
            y: Math.floor((projected.y + 1.5))
        };
    } else {
        return {
            x: null,
            y: null
        }
    }
};

/**
 * Do LCC projection to convert from longitude and latitude to position.
 * you can refer to https://en.wikipedia.org/wiki/Lambert_conformal_conic_projection
 * for concepts of details.
 *
 * @param {number} lon longitude
 * @param {number} lat latitude
 * @param {object} mapInfo map information for LCC projection
 */
const lccProjectionToGetPosition = (lon, lat, mapInfo) => {
    // check validation
    if (!lon || !lat) {
        return null;
    }

    // convert parameters to radian
    const radiusOfMap = mapInfo.radiusOfMap / mapInfo.grid;
    const stdLat1 = mapInfo.stdLat1 * DEG_TO_RAD;
    const stdLat2 = mapInfo.stdLat2 * DEG_TO_RAD;
    const orgLon = mapInfo.orgLon * DEG_TO_RAD;
    const orgLat = mapInfo.orgLat * DEG_TO_RAD;

    let n = Math.tan(PI * 0.25 + stdLat2 * 0.5) / Math.tan(PI * 0.25 + stdLat1 * 0.5);
    n = Math.log(Math.cos(stdLat1) / Math.cos(stdLat2)) / Math.log(n);
    let f = Math.tan(PI * 0.25 + stdLat1 * 0.5);
    f = Math.pow(f, n) * Math.cos(stdLat1) / n;
    let rhoZero = Math.tan(PI * 0.25 + orgLat * 0.5);
    rhoZero = radiusOfMap * f / Math.pow(rhoZero, n);

    let rho = Math.tan(PI * 0.25 + lat * DEG_TO_RAD * 0.5)
    rho = radiusOfMap * f / Math.pow(rho, n);
    let theta = lon * DEG_TO_RAD - orgLon;
    if (theta > PI) {
        theta -= 2.0 * PI;
    } else if (theta < -PI) {
        theta += 2.0 * PI;
    }

    theta *= n;

    return {
        x: (rho * Math.sin(theta)) + mapInfo.orgX,
        y: (rhoZero - rho * Math.cos(theta)) + mapInfo.orgY
    };
};

export { convertToPosition };