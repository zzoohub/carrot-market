import { useEffect, useState } from "react";

export default function useCoords() {
  interface CoordsType {
    latitude: number | null;
    longitude: number | null;
  }

  const [coords, setCoords] = useState<CoordsType>({
    latitude: 0,
    longitude: 0,
  });

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return coords;
}
