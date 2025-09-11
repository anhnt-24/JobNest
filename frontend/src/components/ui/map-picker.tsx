'use client';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';

// Simple version without custom marker
const SimpleMap = dynamic(
	() =>
		import('react-leaflet').then(mod => {
			const { MapContainer, TileLayer, Marker, useMapEvents } = mod;

			const SimpleMapComponent = () => {
				const [position, setPosition] = useState([21.0278, 105.8342]);

				return (
					<MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
						<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; OpenStreetMap contributors' />
						<Marker position={position} />
					</MapContainer>
				);
			};

			return SimpleMapComponent;
		}),
	{ ssr: false }
);

export default function MapPicker() {
	return (
		<div className='w-full'>
			<p className='font-medium'>Chọn Vị trí trên bản đồ</p>
			<div className='h-[400px] rounded-lg overflow-hidden'>
				<SimpleMap />
			</div>
		</div>
	);
}
