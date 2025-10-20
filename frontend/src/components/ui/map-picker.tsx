'use client';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Input } from './input';
import { Label } from './label';

const SimpleMap = dynamic(
	() =>
		import('react-leaflet').then(mod => {
			const { MapContainer, TileLayer, Marker, useMapEvents, useMap } = mod;
			const L = require('leaflet');

			const customIcon = new L.Icon({
				iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
				iconSize: [30, 30],
				iconAnchor: [15, 30],
			});

			function LocationSelector({ onSelect }: { onSelect: (pos: [number, number]) => void }) {
				useMapEvents({
					click(e) {
						const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
						onSelect(newPos);
					},
				});
				return null;
			}

			function MapUpdater({ position }: { position: [number, number] }) {
				const map = useMap();
				map.setView(position, map.getZoom(), { animate: true });
				return null;
			}

			const SimpleMapComponent = ({ position, onSelect }: { position: [number, number]; onSelect: (pos: [number, number]) => void }) => {
				return (
					<MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} className='rounded-xs shadow-sm border border-gray-200'>
						<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; OpenStreetMap contributors' />
						<Marker position={position} icon={customIcon} />
						<LocationSelector onSelect={onSelect} />
						<MapUpdater position={position} />
					</MapContainer>
				);
			};

			return SimpleMapComponent;
		}),
	{ ssr: false }
);
type CoordsType = [number, number];
interface MapPickerProps {
	coords: CoordsType;
	setCoords: (coords: CoordsType) => void;
}

export default function MapPicker({ coords, setCoords }: MapPickerProps) {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const num = parseFloat(value);
		if (isNaN(num)) return;

		if (name === 'lat') setCoords([num, coords[1]]);
		else setCoords([coords[0], num]);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const { name, value } = e.currentTarget;
			const num = parseFloat(value);
			if (isNaN(num)) return;

			if (name === 'lat') setCoords([num, coords[1]]);
			else setCoords([coords[0], num]);
		}
	};

	return (
		<div className='w-full'>
			<p className='font-medium mb-3 flex items-center gap-2'>Chọn vị trí trên bản đồ</p>

			<div className='h-[400px] overflow-hidden relative mb-4'>
				<SimpleMap position={coords} onSelect={pos => setCoords(pos)} />
			</div>

			<div className='space-y-4 w-70'>
				<div className='flex justify-between'>
					<Label>Vĩ độ:</Label>
					<Input type='number' step='0.00001' name='lat' value={coords[0]} onChange={handleInputChange} onKeyDown={handleKeyDown} className='w-50' />
				</div>
				<div className='flex justify-between'>
					<Label>Kinh độ:</Label>
					<Input type='number' step='0.00001' name='lng' value={coords[1]} onChange={handleInputChange} onKeyDown={handleKeyDown} className='w-50' />
				</div>
			</div>
		</div>
	);
}
