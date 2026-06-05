<script lang="ts">
    import { onMount } from 'svelte';
    import 'leaflet/dist/leaflet.css';

    let mapContainer: HTMLElement;
    let mapInstance: any;
    let mapType = $state('world');

    onMount(async () => {
        const L = (await import('leaflet')).default;

        const maxZ = 5;

        mapInstance = L.map(mapContainer, {
            crs: L.CRS.Simple,
            minZoom: 3,
            maxZoom: maxZ,
            zoomSnap: 0.5,
            maxBoundsViscosity: 1.0,
            // fadeAnimation: false
        });

        const mapDimension = 2 ** maxZ * 256;
        const width = mapDimension;
        const height = mapDimension;

        const emptySpaceTop = 1190;
        const emptySpaceBottom = 1275;

        const actualTopY = emptySpaceTop;
        const actualBottomY = height - emptySpaceBottom;

        // 1. BOUNDS UNTUK OVERLAY (Full Canvas, tanpa crop)
        const fullSouthWest = mapInstance.unproject([0, height], maxZ);
        const fullNorthEast = mapInstance.unproject([width, 0], maxZ);
        const fullBounds = new L.LatLngBounds(fullSouthWest, fullNorthEast);

        // 2. BOUNDS UNTUK TILES & CAMERA (Cropped Canvas)
        const southWest = mapInstance.unproject([0, actualBottomY], maxZ);
        const northEast = mapInstance.unproject([width, actualTopY], maxZ);
        const bounds = new L.LatLngBounds(southWest, northEast);

        mapInstance.setMaxBounds(bounds);

        // 3. RENDER FALLBACK IMAGE (Z-Index 1: Lapisan terbawah)
        L.imageOverlay('/leaflet/maplayer.webp', fullBounds, {
            zIndex: 1,
            opacity: 1 // Opsional: Set ke 0.5 kalau kamu mau efek fade/skeleton
        }).addTo(mapInstance);

        // 4. RENDER HIGH-RES TILES (Z-Index 2: Menimpa fallback)
        L.tileLayer('/map/{z}/{x}/{y}.png', {
            bounds: bounds,
            noWrap: true,
            tileSize: 256,
            minNativeZoom: 0,
            maxNativeZoom: maxZ,
            zIndex: 2, 
            keepBuffer: 4,
            
            // FIX PERFORMANCE ISSUE:
            updateWhenZooming: false,
            updateInterval: 200 
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
</div>

<style>
    :global(.leaflet-container) {
        background: #c6ad89 !important;
    }
    :global(.leaflet-overlay-pane) {
        z-index: 199!important;
		filter: brightness(0.5);
    }
</style>