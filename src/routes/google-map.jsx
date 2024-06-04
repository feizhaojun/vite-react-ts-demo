import React, { useEffect, useRef, useState } from 'react';
import { APIProvider, Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import './google-map.css';

function GoogleMapContent() {
  const _param = (new URLSearchParams(window.location.search)).get('param');
  let param;
  try {
    param = JSON.parse(_param)
  } catch (e) { console.log(e) }
  const { defaultPosition = null, defaultSearch = '' } = param || {};

  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const [position, setPosition] = useState(defaultPosition);

  const geocoder = new window.google.maps.Geocoder();

  // 将传入的 defaultSearch 赋值给 Input，inputRef 应该有更科学的方式。
  const setSearchValue = () => {
    if (window.googleMapSearchReady) {
      return;
    } else {
      setTimeout(() => {
        setSearchValue();
      }, 200);
    }
    if (inputRef.current) {
      inputRef.current.value = defaultSearch;
      window.googleMapSearchReady = true;
    }
  }

  const handleClick = (e) => {
    setPosition(e.detail.latLng);
  }
  const handleCenterChanged = (e) => {
    setPosition({
      lat: e.map.center.lat(),
      lng: e.map.center.lng(),
    });
  }

  const handleDragEnd = (e) => {
    setPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  }

  const handlePlaceChange = () => {
    const [currentPlace] = searchRef.current.getPlaces();
    // const { geometry = {}, name } = currentPlace;
    const { geometry = {} } = currentPlace;
    const { location = {} } = geometry;
    setPosition({
      lat: location.lat(),
      lng: location.lng(),
    });
  };

  const handleMessage = (msg) => {
    console.log(msg);
    if (msg?.data?.cmd === 'confirm') {
      console.log(position);
      geocoder.geocode({ latLng: position }, (res = []) => {
        console.log('geocode:', res);
        if (res?.length) {
          const [address = {}] = res;
          const { formatted_address: formattedAddress } = address;
          const data = {
            cmd: 'googleMap',
            data: {
              position,
              formattedAddress,
            }
          };
          console.log('postMessage send:', data);
          window.parent.postMessage(data, msg.origin);
        }
      });
    } else if (msg?.data?.cmd === 'textSearch') {
      const placesService = new placesLib.PlacesService(map);
      const { query = null } = msg.data.data;
      query && placesService.textSearch({ query }, (data, status) => {
        console.log(data);
        if (status === 'OK') {
          window.parent.postMessage({
            cmd: msg?.data?.cmd,
            data: JSON.parse(JSON.stringify(data)),
          }, msg.origin);
        }
      });
    }
  }

  useEffect(() => {
    if (!defaultPosition && defaultSearch) {
      geocoder.geocode({ address: defaultSearch }, (results, status) => {
        if (status === 'OK') {
          setPosition({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() });
        } else {
          console.log(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    }
    setSearchValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage, false);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, placesLib, map]);

  return (
    <Map
      ref={mapRef}
      style={{ width: '100vw', height: '100vh' }}
      defaultCenter={position}
      center={position}
      defaultZoom={13}
      onClick={handleClick}
      onCenterChanged={handleCenterChanged}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    >
      <div className="googleMapCls">
        <div className="inputWrapper">
          <StandaloneSearchBox
            ref={searchRef}
            controlPosition={window?.google && window?.google?.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={handlePlaceChange}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="请输入关键词"
              // allowClear
              style={{
                width: '267px',
                boxSizing: 'border-box',
                border: '1px solid transparent',
                height: '40px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '14px',
                outline: 'none',
                textOverflow: 'ellipses',
              }}
            />
          </StandaloneSearchBox>
        </div>
      </div>
      <Marker position={position} draggable={true} onDragEnd={handleDragEnd} />
    </Map>
  );
}

export default function GoogleMap() {
  return (<APIProvider apiKey="AIzaSyCejnXqHOouXXN4xjOPYpk1d6m4E4fHRWw">
    <GoogleMapContent />
  </APIProvider>);
}