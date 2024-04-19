
<script>
    import {location} from 'svelte-spa-router'
    let value = document.title
    let open = false
    function setT() {
        setTimeout(() => {
            value = document.title
        }, 100)
    }
    $: setT($location) 
</script>


<header> 
    <div class="navbar bg-neutral text-neutral-content"> 
        <div class="flex-1">
             <a href="#/" class="btn btn-ghost text-xl">
                <span>{value}</span></a> 
        </div>  
        <div class="flex-none">
            <button class="btn btn-square btn-ghost" on:click={() => (open = true)}>
                <svg class="nwp-icon nwp-icon-20"><use xlink:href="#nwp-burger" /></svg>
            </button>
        </div>               
    </div>             
</header>