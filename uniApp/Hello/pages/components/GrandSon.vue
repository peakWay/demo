<template>
	<view>
		<view>Inject内容</view>
		<view>静态内容：{{ message }}</view>
		<view>动态内容：{{ dynamicMsg.value.a }}</view>
		<button @click="handleAdd">更改祖先a的值</button>
	</view>
</template>

<script setup>
	import { inject } from 'vue';
	import { DYNAMIC_MESSAGE, STATIC_MESSAGE } from '../shared/symbols';
	
	const message = inject(STATIC_MESSAGE, '默认值')
	const dynamicMsg = inject(DYNAMIC_MESSAGE)
	const handleAdd = () => {
		dynamicMsg.onChange()
	}
</script>

<style>
</style>