'use client';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';
import './globals.css';
import { Icon } from 'leaflet';
import { useState, useEffect } from 'react';
import { LatLngTuple, LatLngExpression } from 'leaflet';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const customIcon = new Icon({
	iconUrl:
		'https://png.pngtree.com/png-vector/20190115/ourmid/pngtree-pin-map-graphic-icon-design-template-png-image_316202.jpg',
	iconSize: [30, 30],
});

export default function Body() {
	const [search, setSearch] = useState('');
	const [ipAddress, setIpAddress] = useState('122.1221.21.221');
	const [location, setLocation] = useState('Brooklyn,NY 10001');
	const [timezone, setTimezone] = useState('UTC-05:00');
	const [isp, setIsp] = useState('SpaceX Starlink');
	const [geoCode, setGeoCode] = useState<LatLngExpression>([
		6.465422, 3.406448,
	]);

	const DynamicMarker = ({ position }: { position: LatLngExpression }) => {
		const map = useMap();

		useEffect(() => {
			map.setView(position, map.getZoom());
		}, [position, map]);

		return (
			<Marker position={position}>
				<Popup>Here</Popup>
			</Marker>
		);
	};

	const handleSearch = async (e: any) => {
		e.preventDefault();
		const response = await fetch('/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(search),
		})
			.then((res) => res.json())
			.then((val) => {
				console.log(val);
				setIpAddress(val.ip);
				setLocation(`${val.location.city} ${val.location.region}`);
				setIsp(val.isp);
				setTimezone(val.location.timezone);
				setGeoCode([Number(val.location.lat), Number(val.location.lng)]);
			})
			.catch((e) => console.log(e));
	};
	return (
		<main className=''>
			<section className='bg-mobilebg md:bg-desktopbg p-10 flex flex-col justify-center items-center gap-5 shadow-md bg-cover bg-center'>
				{/* search section */}
				<h1 className='text-center text-white font-bold text-2xl select-none'>
					IP Address Tracker
				</h1>
				<form
					onSubmit={handleSearch}
					className='flex items-center w-full md:w-1/2 pb-12'
				>
					<input
						placeholder='Search for any domain (www.example.com)'
						type='text'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className='rounded-l-xl p-3 px-3 w-full text-sm'
					/>
					<button className='bg-black text-white p-3 px-4 rounded-r-xl'>
						<ChevronRightIcon className='w-6' />
					</button>
				</form>
			</section>

			<div className='relative'>
				<section className=' w-full mt-3 z-40 absolute -top-20  px-10 flex items-center justify-center'>
					{/* result section */}
					<div className='bg-white flex flex-col md:flex-row gap-2 p-3 py-5 md:gap-5  md:p-6 justify-evenly items-center w-full lg:w-3/4 rounded-xl z-40 shadow-xl'>
						<div className='w-full lg:border-r text-center lg:text-left'>
							<h2 className='font-extrabold text-sm text-gray-500 uppercase font-mono'>
								IP Address
							</h2>
							<p className='font-bold text-black text-xl lg:py-2'>
								{ipAddress}
							</p>
						</div>
						<div className='w-full lg:border-r text-center lg:text-left'>
							<h2 className='font-extrabold text-sm text-gray-500 uppercase font-mono'>
								Location
							</h2>
							<p className='font-bold text-black text-xl lg:py-2'>{location}</p>
						</div>
						<div className='w-full lg:border-r text-center lg:text-left'>
							<h2 className='font-extrabold text-sm text-gray-500 uppercase font-mono'>
								Timezone
							</h2>
							<p className='font-bold text-black text-xl lg:py-2'>{timezone}</p>
						</div>
						<div className='w-full text-center lg:text-left'>
							<h2 className='font-extrabold text-sm text-gray-500 uppercase font-mono'>
								isp
							</h2>
							<p className='font-bold text-black text-xl lg:py-2'>{isp}</p>
						</div>
					</div>
				</section>
				<section className='-z-0'>
					{/* map section */}
					<MapContainer
						center={geoCode}
						zoom={13}
						scrollWheelZoom={true}
						className='min-h-screen w-screen -z-10'
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						/>
						<DynamicMarker position={geoCode} />
					</MapContainer>
				</section>
			</div>
		</main>
	);
}
