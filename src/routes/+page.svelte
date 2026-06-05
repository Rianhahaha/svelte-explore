<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    
    let pageTitle = 'My Awesome Page';
    
    // State management untuk sistem lock
    let password = $state('');
    let isUnlocked = $state(false);
    let errorMsg = $state('');

    function handleLogin(e: Event) {
        e.preventDefault();
        
        if (password === 'rianhahaha') {
            isUnlocked = true;
            errorMsg = '';
        } else {
            errorMsg = 'Incorrect password.';
            password = ''; // Reset input field jika salah
        }
    }
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <meta property="og:title" content={pageTitle} />
</svelte:head>

<section class="flex h-dvh w-full items-center justify-center bg-amber-500">
    {#if !isUnlocked}
        <form 
            onsubmit={handleLogin} 
            class="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-xl min-w-[300px]"
        >
            <h2 class="text-center text-xl font-bold text-slate-800">Preview Access</h2>
            
            <input 
                type="password" 
                bind:value={password} 
                placeholder="Enter password..." 
                class="rounded-lg border-2 border-slate-200 px-4 py-2 text-slate-800 focus:border-amber-500 focus:outline-none"
            />
            
            {#if errorMsg}
                <p class="text-sm text-red-500 text-center font-medium">{errorMsg}</p>
            {/if}
            
            <button 
                type="submit" 
                class="mt-2 rounded-xl bg-slate-800 px-5 py-2 text-white hover:bg-slate-600 transition-colors"
            >
                Unlock
            </button>
        </form>
    {:else}
        <div class="flex flex-col justify-center gap-4 text-center">
            <a class="rounded-2xl bg-slate-800 px-5 py-2 text-white transition-colors hover:bg-slate-600" href="/promordo">
                To Pomodoro
            </a>
            <a class="rounded-2xl bg-slate-800 px-5 py-2 text-white transition-colors hover:bg-slate-600" href="/landing">
                To Simple landing Page
            </a>
            <a class="rounded-2xl bg-slate-800 px-5 py-2 text-white transition-colors hover:bg-slate-600" href="/meta">
                Metadata Research
            </a>
            <a class="rounded-2xl bg-slate-800 px-5 py-2 text-white transition-colors hover:bg-slate-600" href="/leaflet">
                Leaflet Research
            </a>
        </div>
    {/if}
</section>