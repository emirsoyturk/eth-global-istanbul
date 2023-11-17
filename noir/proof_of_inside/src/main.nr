use dep::std::verify_proof;

struct GeoPoint {
    integer: i64,
    fraction: i64
}

struct GeoLocation {
    latitude: GeoPoint,
    longitude: GeoPoint
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

fn main(verification_key : [Field; 114], proof: [Field; 94], public_inputs : [Field; 1], key_hash : Field, location: GeoLocation, borders: [GeoLocation; 4], ) {
    
    let mock_aggregation = [0;16];
    let output_aggregation_object = verify_proof(
        verification_key.as_slice(),
        proof.as_slice(),
        public_inputs.as_slice(),
        key_hash,
        mock_aggregation
    );

    let isInside = is_point_in_polygon(location, borders);

    assert(isInside);
}


#[test]
fn test_main() {
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

    main(location, borders);
}
