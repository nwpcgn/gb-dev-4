<script>
	import { TabControl, TabControlItem } from 'renderless-svelte'
	import GbImages from './GbImages.svelte'
	import GbSprite from './GbSprite.svelte'
	import { colorPalette } from './'
		let imgList = [
		{
			id: 1,
			name: 'gb-ball-empty',
			xlink: '#ball-empty',
			width: 7,
			height: 7
		},
		{
			id: 2,
			name: 'gb-ball-full',
			xlink: '#ball-full',
			width: 7,
			height: 7
		},
		{
			id: 3,
			name: 'gb-blue-balls',
			xlink: '#blue-balls',
			width: 77,
			height: 13
		},
		{
			id: 4,
			name: 'gb-blue-front',
			xlink: '#blue-front',
			width: 56,
			height: 56
		},
		{
			id: 5,
			name: 'gb-blue-line',
			xlink: '#blue-line',
			width: 77,
			height: 13
		},
		{
			id: 6,
			name: 'gb-eevee-back',
			xlink: '#eevee-back',
			width: 28,
			height: 28
		},
		{
			id: 7,
			name: 'gb-eevee-front',
			xlink: '#eevee-front',
			width: 56,
			height: 56
		},
		{
			id: 8,
			name: 'gb-favicon',
			xlink: '#favicon',
			width: 16,
			height: 16
		},
		{
			id: 9,
			name: 'gb-frame',
			xlink: '#frame',
			width: 16,
			height: 16
		},
		{
			id: 10,
			name: 'gb-hp',
			xlink: '#hp',
			width: 11,
			height: 4
		},
		{
			id: 11,
			name: 'gb-level',
			xlink: '#level',
			width: 6,
			height: 5
		},
		{
			id: 12,
			name: 'gb-logo',
			xlink: '#logo',
			width: 216,
			height: 22
		},
		{
			id: 13,
			name: 'gb-marker',
			xlink: '#marker',
			width: 5,
			height: 7
		},
		{
			id: 14,
			name: 'gb-pikachu-back',
			xlink: '#pikachu-back',
			width: 28,
			height: 28
		},
		{
			id: 15,
			name: 'gb-pikachu-front',
			xlink: '#pikachu-front',
			width: 56,
			height: 56
		},
		{
			id: 16,
			name: 'gb-red-back',
			xlink: '#red-back',
			width: 28,
			height: 28
		},
		{
			id: 17,
			name: 'gb-red-balls',
			xlink: '#red-balls',
			width: 77,
			height: 13
		},
		{
			id: 18,
			name: 'gb-red-front',
			xlink: '#red-front',
			width: 56,
			height: 56
		},
		{
			id: 19,
			name: 'gb-red-line-battle',
			xlink: '#red-line-battle',
			width: 77,
			height: 21
		},
		{
			id: 20,
			name: 'gb-red-line',
			xlink: '#red-line',
			width: 77,
			height: 13
		}
	]
let frameW = 0
let imgW = 247
let scale = 1

function calcScale() {
  scale = (frameW / imgW).toFixed(1)
}

function copyToClip(text) {
  // const text = "Example text to appear on clipboard";
  return navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!", text);
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}



function copyText(e) {
  // const text = "Example text to appear on clipboard";
  let el1 = e.currentTarget
  const obj = {
      id: el1.id,
      fill: el1.getAttribute("fill"),
      stroke: el1.getAttribute("stroke"),
      x: el1.getBoundingClientRect().x,
      y: el1.getBoundingClientRect().y,
      w: el1.getBoundingClientRect().width,
      h: el1.getBoundingClientRect().height,
    };
    copyToClip(obj.fill).then(() => alert(`--gb-${obj.id}: ${obj.fill};`));
  
}

$: calcScale(frameW)

</script>

<GbSprite />
<article bind:clientWidth={frameW} class="absolute inset-0 overflow-hidden flex flex-col">
	<TabControl>
		<div class="content tabs tabs-bordered" slot="tabs" let:tabs>
			{#each tabs as { active, disabled, payload, select }}
				<button
					role="tab"
					class="tab"
					class:tab-active={active}
					on:click={select}
					{disabled}>{payload}</button>
			{/each}
		</div>

		<div class="flex-1 relative">
			<TabControlItem id="P" payload="Picker" active>
				<section class="layer nwp">
					<article class="content">
          <div>Scale: {scale}</div>
                  <div>
                  <svg width="100%" height="auto" viewBox="0 0 280 40">
                    <defs>
                      <path d="M280 0L280 0L280 40L0 40L0 0L280 0Z" id="path_1" />
                      <clipPath id="clip_1">
                        <use
                          xlink:href="#path_1"
                          clip-rule="evenodd"
                          fill-rule="evenodd" />
                      </clipPath>
                    </defs>
                    <g id="color-bar">
                      <path
                        d="M280 0L280 0L280 40L0 40L0 0L280 0Z"
                        id="color-bar"
                        fill="none"
                        stroke="none" />
                      <g id="gb" clip-path="url(#clip_1)">
                        <path
                        on:pointerdown={copyText}
                          data-pick="#303C17"
                          d="M0 0L40 0L40 40L0 40L0 0Z"
                          id="bg-base"
                          fill="#AD9D42"
                          fill-rule="evenodd"
                          stroke="none" />
                        <path on:pointerdown={copyText}
                          data-pick="#303C17"
                          d="M40 0L80 0L80 40L40 40L40 0Z"
                          id="bg-secondary"
                          fill="#979797"
                          fill-rule="evenodd"
                          stroke="none" />
                        <path on:pointerdown={copyText}
                          data-pick="#303C17"
                          d="M80 0L120 0L120 40L80 40L80 0Z"
                          id="text-secondary"
                          fill="#585A26"
                          fill-rule="evenodd"
                          stroke="none" />
                        <path on:pointerdown={copyText}
                          data-pick="#979797"
                          d="M120 0L160 0L160 40L120 40L120 0Z"
                          id="text-base"
                          fill="#303C17"
                          fill-rule="evenodd"
                          stroke="none" />
                        <path on:pointerdown={copyText}
                          data-pick="#979797"
                          d="M160 0L200 0L200 40L160 40L160 0Z"
                          id="text-contrast"
                          fill="#252F0F"
                          fill-rule="evenodd"
                          stroke="none" />
                        <path on:pointerdown={copyText}
                          data-pick="#979797"
                          d="M200 0L240 0L240 40L200 40L200 0Z"
                          id="text-disabled"
                          fill="#585A26"
                          fill-rule="evenodd"
                          stroke="none" />
                        <path on:pointerdown={copyText}
                          data-pick="#979797"
                          d="M240 0L280 0L280 40L240 40L240 0Z"
                          id="bg-contrast"
                          fill="#252F0F"
                          fill-rule="evenodd"
                          stroke="none" />
                      </g>
                    </g>
                  </svg>
                  </div>
          <div>
          <h2>Images</h2>
         <div>
{#each imgList as {id,name,xlink,width,height}}
<span class="border">
	 <svg><use xlink:href={xlink}></use></svg>
</span>
{/each}
          </div> 
          </div>
				
					</article>
				</section>
			</TabControlItem>
			<TabControlItem id="S" payload="Info">
				<section class="layer nwp">
					<article class="content">
						<GbImages />
					</article>
				</section>
			</TabControlItem>
			<TabControlItem id="R" payload="Palette">
				<section class="layer nwp">
					<article class="content">
						<div class="mockup-code">
							<pre>{JSON.stringify(colorPalette, null, '    ')}</pre>
						</div>
					</article>
				</section>
			</TabControlItem>
			<TabControlItem id="H" payload="Images">
				<section class="layer nwp">
					<article class="content">
            <details class="collapse bg-base-100" >
              <summary class="collapse-title text-xl font-medium">Show Json List</summary>
              <div class="collapse-content"> 
                <div class="mockup-code">
                          <pre class="text-warning">{JSON.stringify(imgList, null, '    ')}</pre>
                        </div>

              </div>
            </details>
					

					</article>
				</section>
			</TabControlItem>
		</div>
	</TabControl>
</article>
