<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}{{name}}</text>
		</view>
		<view>
			<input v-model="name" />
		</view>
		<view v-for="(item, index) in toDoList" :style="{color: 'red'}" :class="{big: index == 0}">
			{{ item }}
		</view>
		<view v-if="name">已输入姓名</view>
		<view>a: {{ obj.a }} b: {{ obj.b }}</view>
		<view>a * b: {{ spart }}</view>
		<button @click="handleClick">请点击</button>
		<Child v-model="visible" tip="提示" @click="(e) => console.log(e)" style="background: skyblue;" >
			<view style="color: red;">插槽内容</view>
		</Child>
	</view>
</template>

<script setup>
	import { computed, onMounted, onUpdated, provide, reactive, ref, watchEffect } from 'vue';	
	import Child from '../components/Child.vue';
	import { DYNAMIC_MESSAGE, STATIC_MESSAGE } from '../shared/symbols';
	const title = ref('Hello，World')
	const name = ref('费涛')
	const toDoList = ref(['react', 'vue', 'redux'])
	
	const obj = reactive({
		a: 1,
		b: 2
	})
	
	const handleClick = () => {
		obj.a++
	}
	
	provide(STATIC_MESSAGE, '根组件的提供的Message')
	console.log(obj)
	provide(DYNAMIC_MESSAGE, {
		/* 这里不能提供obj.a，响应式会无效 */
		value: obj,
		onChange: handleClick
	})
	
	const visible = ref(true)
	console.log(visible.value)
	
	
	
	const spart = computed(() => {
		return obj.a * obj.b
	})
	
	onMounted(() => {
		console.log('初始化')
	})
	
	onUpdated(() => {
		console.log('更新')
	})
	
	watchEffect(() => {
		console.log(name.value)
		console.log(visible.value)
	})
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.big {
		font-size: 30px;
	}
</style>
