<template>
	<div place="content-center items-center" h="screen" font="mono">
		<div style="display: flex; flex-wrap: wrap; justify-content: space-between">
			<div style="width: 33%">
				<strong class="bg-red-600">API data</strong>
				<!-- <pre>{{ data }}</pre> -->
				<!-- <JsonTreeView :json="JSON.stringify(data)" :max-depth="99" colorScheme="dark" root-key="Laravel response" /> -->
				<vue-json-pretty :data="data" />
			</div>
			<div style="width: 33%">
				<strong class="bg-red-600">Pinia ORM data</strong>
				<vue-json-pretty :data="audiobooks" />
				<!-- <pre>{{ audiobooks }}</pre> -->
				<!-- <JsonTreeView :json="JSON.stringify(audiobooks)" :max-depth="99" colorScheme="dark" root-key="Laravel response" /> -->
			</div>
			<div style="width: 33%">
				<strong class="bg-red-600">Pinia ORM data</strong>
				<vue-json-pretty :data="languages" />
				<!-- <pre>{{ languages }}</pre> -->
				<!-- <JsonTreeView :json="JSON.stringify(languages)" :max-depth="99" colorScheme="dark" root-key="Laravel response" /> -->
			</div>
			<!-- <strong class="bg-red-600">Dirty data</strong>
			<ul>
				<li v-for="audiobook in audiobooks" :key="audiobook.id">{{ audiobook.title }} - {{ audiobook.$isDirty() }}</li>
			</ul> -->
		</div>
	</div>
</template>

<script setup>
	import { useRepo } from 'pinia-orm';
	import { computed } from 'vue';

	import Audiobook from './models/Audiobook.js';
	import Language from './models/Language.js';
	import data from './data.js';
	// import { JsonTreeView } from 'json-tree-view-vue3';
	// import 'json-tree-view-vue3/dist/style.css';
	import VueJsonPretty from 'vue-json-pretty';
	import 'vue-json-pretty/lib/styles.css';

	const audiobookRepo = useRepo(Audiobook);
	const languageRepo = useRepo(Language);
	const dataClone = JSON.parse(JSON.stringify(data));
	console.log('dataClone: ', dataClone);

	audiobookRepo.save(dataClone);

	const audiobooks = computed(() =>
		audiobookRepo
			.withAllRecursive()
			// .with('languages', query => {
			// 	query.with('speaker');
			// })
			.get()
	);
	const languages = computed(() => languageRepo.withAllRecursive(1).get());
	const audiobooksOriginal = computed(() => audiobooks.value.map(u => u.$getOriginal()));
</script>

<style scoped>
	.logo {
		height: 6em;
		padding: 1.5em;
		transition: filter 300ms;
		will-change: filter;
	}

	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}

	.logo.vue:hover {
		filter: drop-shadow(0 0 2em #42b883aa);
	}
</style>
