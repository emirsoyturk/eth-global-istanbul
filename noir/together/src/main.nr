use dep::std::{ecdsa_secp256k1};

struct GeoPoint {
    integer: i64,
    fraction: i64
}c

struct GeoLocation {
    latitude: GeoPoint,
    longitude: GeoPoint
}

fn main(signature : pub [u8;64], message: [u8;32], location: GeoLocation, borders: [GeoLocation; 4]) {
    let TRUSTED_PUBLIC_KEY_X : [u8; 32] = [
        32, 211,  47,  51,  81, 118, 194, 213,
        129,  17, 147, 200,  82,  44, 199, 233,
        62,  85, 134,  74, 168, 184, 207,  26,
        30, 228, 214, 163, 238,  25,  66, 245
    ];

    let TRUSTED_PUBLIC_KEY_Y : [u8; 32] = [
        251, 253, 234,  58, 100, 130,  99, 134,
        111,  91,  66, 169,  59,  88, 236, 114,
        200, 120,  27, 125,  40, 179, 116,  64,
        208,  51, 106, 162,  38,  31, 159, 189
    ];

    let valid_signature = ecdsa_secp256k1::verify_signature(TRUSTED_PUBLIC_KEY_X, TRUSTED_PUBLIC_KEY_Y, signature, message);

    assert(valid_signature);

    let isInside = is_point_in_polygon(location, borders);
    assert(isInside);
}

fn is_point_in_polygon(location: GeoLocation, borders: [GeoLocation; 4]) -> bool {
    let mut j = 3;
    let mut inside = false;

    for i in 0..4 {
        let x_i = borders[i].latitude.integer;
        let y_i = borders[i].longitude.integer;
        let x_j = borders[j].latitude.integer;
        let y_j = borders[j].longitude.integer;

        let intersect1 = (y_i > location.longitude.integer) != (y_j > location.longitude.integer);
        let intersect2 = location.latitude.integer < (x_j - x_i) * (location.longitude.integer - y_i) / (y_j - y_i) + x_i;

        if intersect1 {
            if intersect2 {
                inside = !inside;
            }
        }

        j = i;
    }

    inside
}


#[test]
fn test_main() {

    let signature: [u8;64] = [
        80, 175, 247,  73,  49, 117, 182, 241,  44,  14,   8,
        232, 200, 151,  29, 144, 235, 114, 111, 204, 224, 132,
        126, 169,  28,  65, 195, 240,  99,  32, 116, 109, 126,
        8, 224, 102,  48,  32,  76, 155, 235,  81, 176, 240,
        165,  46,  94, 174, 241, 244, 104, 108, 107,  11, 178,
        44,  52, 243, 150,  63, 170,  89, 114,  88
    ];

    let position: [u8; 32] = [
        3,  57, 199, 96, 145,  58, 183, 241,
        206, 140,  36, 34, 165, 163,  17, 210,
        97, 254, 154, 79,  91, 223, 149,  18,
        3, 210, 111, 56, 246, 219,  19, 104
    ];

        let borders: [GeoLocation; 4] = [
        GeoLocation {
            latitude: GeoPoint { integer: 82, fraction: 0 },
            longitude: GeoPoint { integer: 66, fraction: 0 },
        },
        GeoLocation {
            latitude: GeoPoint { integer: 79, fraction: 0 },
            longitude: GeoPoint { integer: 61, fraction: 0 },
        },
        GeoLocation {
            latitude: GeoPoint { integer: 99, fraction: 0 },
            longitude: GeoPoint { integer: 58, fraction: 0 },
        },
        GeoLocation {
            latitude: GeoPoint { integer: 122, fraction: 0 },
            longitude: GeoPoint { integer: 71, fraction: 0 },
        },
    ];

    let location: GeoLocation = GeoLocation {
        latitude: GeoPoint { integer: 99, fraction: 0 },
        longitude: GeoPoint { integer: 10, fraction: 0 },
    };

    main(signature, position, location, borders); 
}