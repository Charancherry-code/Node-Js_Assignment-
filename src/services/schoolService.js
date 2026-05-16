const pool = require("../config/db");

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function haversineDistanceKm(lat1, lon1, lat2, lon2) {
  const radiusKm = 6371;
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);
  const startLat = toRadians(lat1);
  const endLat = toRadians(lat2);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(startLat) *
      Math.cos(endLat) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  return 2 * radiusKm * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function addSchool({ name, address, latitude, longitude }) {
  const [result] = await pool.execute(
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
    [name.trim(), address.trim(), latitude, longitude],
  );

  return {
    id: result.insertId,
    name: name.trim(),
    address: address.trim(),
    latitude,
    longitude,
  };
}

async function listSchoolsByProximity(userLatitude, userLongitude) {
  const [rows] = await pool.execute(
    "SELECT id, name, address, latitude, longitude FROM schools",
  );

  return rows
    .map((school) => ({
      ...school,
      distanceKm: Number(
        haversineDistanceKm(
          userLatitude,
          userLongitude,
          toNumber(school.latitude),
          toNumber(school.longitude),
        ).toFixed(3),
      ),
    }))
    .sort((first, second) => first.distanceKm - second.distanceKm);
}

module.exports = {
  addSchool,
  listSchoolsByProximity,
  haversineDistanceKm,
};
