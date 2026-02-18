// src/routes/images/articles/[id]/cover.jpg/+server.ts
import { error } from '@sveltejs/kit';

// Ganti ini sesuai logic fetcher kamu atau import instance strapi kamu
	import { PUBLIC_STRAPI_BASE_URL } from '$env/static/public';
const STRAPI_BASE = PUBLIC_STRAPI_BASE_URL; 

// WAJIB: Ini yang bikin dia jalan pas build time
export const prerender = true;

export async function GET({ params, fetch }) {
    const { id } = params;

    try {
        // 1. Kita harus cari tau dulu URL gambar aslinya dari ID artikel
        // (Agak redundant fetch artikel lagi, tapi ini harga mati buat build statis yang rapi)
        const articleRes = await fetch(`${STRAPI_BASE}/api/articles/${id}?populate=cover`);
        
        if (!articleRes.ok) throw error(404, 'Artikel tidak ditemukan');
        
        const articleJson = await articleRes.json();
        // Sesuaikan traversing data ini dengan versi Strapi kamu (v4/v5 beda dikit struktur datanya)
        const articleData = articleJson.data; 
        const remoteUrl = articleData.cover?.url; // atau articleData.attributes.cover.data.attributes.url

        if (!remoteUrl) {
            // Kalau artikel gak punya cover, balikin 404 atau redirect ke placeholder
            throw error(404, 'Cover image not found');
        }

        // 2. Fetch Binary Image dari Strapi
        const fullImageUrl = remoteUrl.startsWith('http') ? remoteUrl : `${STRAPI_BASE}${remoteUrl}`;
        const imageRes = await fetch(fullImageUrl);
        const imageBlob = await imageRes.blob();

        // 3. Return sebagai Response fisik
        return new Response(imageBlob, {
            headers: {
                'Content-Type': imageRes.headers.get('Content-Type') || 'image/jpeg',
                'Cache-Control': 'public, max-age=31536000, immutable'
            }
        });

    } catch (err) {
        console.error(`❌ Gagal prerender image artikel ${id}:`, err);
        // Opsi: return placeholder image default kalau gagal
        throw error(404, 'Image processing failed');
    }
}