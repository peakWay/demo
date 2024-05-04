<template>
	<view>
		<view v-if="modelValue">
			<view>这是个组件</view>
			<h3>{{ title }}</h3>
			<h4>{{ tip }}</h4>
			<slot></slot>
			<button @click="handleClick">触发事件</button>
		</view>
		<button @click="handleChangeVisible">{{ modelValue ? '隐藏' : '显示' }}组件内容</button>
		<GrandSonVue></GrandSonVue>
	</view>
</template>

<script setup>
	import { provide } from 'vue';
	import GrandSonVue from './GrandSon.vue';
	import { STATIC_MESSAGE } from '../shared/symbols';

	/* props */
	const props = defineProps({
		title: {
			type: String,
			default: '默认标题'
		},
		tip: String,
		modelValue: Boolean
	})
	const emit = defineEmits(['click', 'update:modelValue'])
	provide(STATIC_MESSAGE, '子组件提供的provider')
	
	const handleClick = () => {
		emit('click', '子组件事件')
	}
	
	const handleChangeVisible = () => {
		emit('update:modelValue', !props.modelValue)
	}
</script>

<style>
</style>