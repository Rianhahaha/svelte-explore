<script lang="ts">
    import { onMount } from 'svelte';
    import 'leaflet/dist/leaflet.css';

    let mapContainer: HTMLElement;
    let mapInstance: any; 

    onMount(async () => {
        const L = (await import('leaflet')).default;

        const maxZ = 4; // Berdasarkan screenshot, folder Z berhenti di 4

        mapInstance = L.map(mapContainer, {
            crs: L.CRS.Simple,
            minZoom: 0,
            maxZoom: maxZ,
            zoomSnap: 0.5, 
        });

        // Dimensi presisi berdasarkan jumlah grid Z=4 (16 col x 12 row)
        const width = 4096; 
        const height = 3072;

        // Proyeksi bounds dihitung berdasarkan maxZoom
        const southWest = mapInstance.unproject([0, height], maxZ);
        const northEast = mapInstance.unproject([width, 0], maxZ);
        const bounds = new L.LatLngBounds(southWest, northEast);

        // Perhatikan penambahan double 'output' sesuai struktur foldermu
        L.tileLayer('/leaflet/{z}/{x}/{y}.png', {
            bounds: bounds,
            noWrap: true,
            tileSize: 256,
            minNativeZoom: 0,
            maxNativeZoom: maxZ
        }).addTo(mapInstance);

        mapInstance.fitBounds(bounds);

        return () => {
            if (mapInstance) {
                mapInstance.remove();
            }
        };
    });
</script>

<div class="relative w-full h-screen bg-[#1a1a1a]">
    <div bind:this={mapContainer} class="w-full h-full z-10"></div>
</div>