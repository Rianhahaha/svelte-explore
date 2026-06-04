<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';

	let mapContainer: HTMLElement;
	let mapInstance: any;
	let mapType = $state('world');

	onMount(async () => {
		const L = (await import('leaflet')).default;

		const maxZ = 4;

		// 1. Initialize map WITHOUT maxBounds first
		mapInstance = L.map(mapContainer, {
			crs: L.CRS.Simple,
			minZoom: 3,
			maxZoom: maxZ,
			zoomSnap: 0.5,
			maxBoundsViscosity: 1.0, // Prevent dragging outside bounds
			fadeAnimation:false
		});

		// 2. Absolute Dimension Calculation
		const mapDimension = 2 ** maxZ * 256;
		const width = mapDimension;
		const height = mapDimension;

		// 1. Tentukan offset pemotongan (dalam pixel)
		// Karena gambar di tengah, sisa kosong atas dan bawah biasanya simetris.
		// Angka ini butuh sedikit trial & error tergantung proporsi gambar aslimu.
		const emptySpaceTop = 1190; // Coba ubah angka ini (misal: 1000, 1500, 2000)
		const emptySpaceBottom = 1275;

		const actualTopY = emptySpaceTop;
		const actualBottomY = height - emptySpaceBottom;

		// 2. Proyeksi ulang dengan koordinat Y yang sudah dipotong
		// Format unproject: [X, Y]
		const southWest = mapInstance.unproject([0, actualBottomY], maxZ);
		const northEast = mapInstance.unproject([width, actualTopY], maxZ);
		const bounds = new L.LatLngBounds(southWest, northEast);

		// 3. Set bounds seperti biasa
		mapInstance.setMaxBounds(bounds);

		L.tileLayer('/leaflet/{z}/{x}/{y}.png', {
			bounds: bounds,
			noWrap: true,
			tileSize: 256,
			minNativeZoom: 0,
			maxNativeZoom: maxZ,
			updateInterval: 0,
			updateWhenIdle: false,
			updateWhenZooming: true,
			keepBuffer:4
		}).addTo(mapInstance);

		mapInstance.fitBounds(bounds);

		return () => {
			if (mapInstance) {
				mapInstance.remove();
			}
		};
	});
</script>

<div class="relative h-screen w-full bg-[#c6ad89]!">
	<div bind:this={mapContainer} class="z-10 h-full w-full"></div>
	<!-- 
	<button class="absolute top-[12dvh] left-[12px] w-fit py-3 px-2 bg-slate-700 border-slate-900 text-white z-50">
		Change Map
	</button> -->
</div>

<style>
:global(.leaflet-container) {
        background: #c6ad89 !important;
    }
</style>
