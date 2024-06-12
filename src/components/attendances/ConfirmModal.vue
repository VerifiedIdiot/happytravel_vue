<!-- ConfirmModal.vue -->
<template>
	<div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
	  <div class="bg-white p-6 rounded-lg shadow-lg">
		<h3 class="text-xl font-semibold mb-4">{{ title }}</h3>
		<p class="mb-4">{{ message }}</p>
		<table v-if="request" class="w-full border">
		  <thead>
			<tr>
			  <th class="border px-4 py-2">사원번호</th>
			  <th class="border px-4 py-2">이름</th>
			  <th class="border px-4 py-2">부서</th>
			  <th class="border px-4 py-2">직급</th>
			  <th class="border px-4 py-2">휴가종류</th>
			  <th class="border px-4 py-2">사유</th>
			  <th class="border px-4 py-2">요청날짜</th>
			  <th class="border px-4 py-2">기간</th>
			</tr>
		  </thead>
		  <tbody>
			<tr>
			  <td class="border px-4 py-2">{{ request.empId }}</td>
			  <td class="border px-4 py-2">{{ request.empName }}</td>
			  <td class="border px-4 py-2">{{ request.departmentName }}</td>
			  <td class="border px-4 py-2">{{ request.positionName }}</td>
			  <td class="border px-4 py-2">{{ request.attendanceTypeName }}</td>
			  <td class="border px-4 py-2">{{ request.reason }}</td>
			  <td class="border px-4 py-2">{{ request.creationDate }}</td>
			  <td class="border px-4 py-2">{{ request.startDate }} ~ {{ request.endDate }}</td>
			</tr>
		  </tbody>
		</table>
		<div class="flex justify-end space-x-4 mt-4">
		  <button @click="confirm" class="px-4 py-2" :class="confirmButtonClass">{{ confirmButtonText }}</button>
		  <button @click="cancel" class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">취소</button>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	props: {
	  show: Boolean,
	  title: String,
	  message: String,
	  request: Object,
	  confirmButtonText: String,
	  confirmButtonClass: String,
	},
	emits: ['confirm', 'cancel'],
	methods: {
	  confirm() {
		this.$emit('confirm');
	  },
	  cancel() {
		this.$emit('cancel');
	  }
	}
  };
  </script>
  