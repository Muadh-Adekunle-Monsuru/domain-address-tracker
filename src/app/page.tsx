'use client';
import dynamic from 'next/dynamic';
const Nossrcomponent = dynamic(() => import('../app/Body'), { ssr: false });
export default function Home() {
	return (
		<main>
			<Nossrcomponent />
		</main>
	);
}
