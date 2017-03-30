import * as MapConverter from '../src/MapConverter';

test('test MapConverter.convertToPosition', () => {
    // this is a position of the my house.
    let lon = 127.106156;
    let lat = 37.508114;

    let result = MapConverter.convertToPosition(lon, lat);

    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();

    expect(result.x).toBe(62);
    expect(result.y).toBe(125);
});
