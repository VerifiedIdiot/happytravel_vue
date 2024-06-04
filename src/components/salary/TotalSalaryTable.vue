<template>
  <div class="flex" id="salary-head">
    <div class="flex items-center justify-center w-1/2 h-10 m-px bg-gray-200">
      <span class="text-lg font-bold">
        급여 항목
      </span>
    </div>
    <div class="flex items-center justify-center w-1/2 h-10 m-px bg-gray-200">
      <span class="text-lg font-bold">
        금 액
      </span>
    </div>
  </div>
  <div class="relative w-full" id="salary-body">
    <div class="flex" v-for="item in salaryBodyData" :key="item.code">
      <div class="flex items-center justify-start w-1/2 h-7 m-px pl-5 bg-white">
        <span>
          {{ item.name }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/2 h-7 m-px pr-5 bg-white">
        <span>
          {{ formatNumber(item.amount) }}
        </span>
      </div>
    </div>
  </div>
  <div class="bottom-0 w-full" id="salary-foot">
    <div class="flex bottom-0 salary-foot" v-for="item in salaryFootData" :key="item.code">
      <div class="flex items-center justify-center w-1/2 h-7 m-px pl-5 bg-blue-300">
        <span class="font-bold text-center">
          {{ item.name }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/2 h-7 m-px pr-5 bg-blue-300">
        <span class="font-bold">
          {{ formatNumber(item.amount) }}
        </span>
      </div>
    </div>
  </div>
  <div class="flex mt-5" id="deduction-head">
    <div class="flex items-center justify-center w-1/2 h-10 m-px bg-gray-200">
      <span class="text-lg font-bold">
        공제 항목
      </span>
    </div>
    <div class="flex items-center justify-center w-1/2 h-10 m-px bg-gray-200">
      <span class="text-lg font-bold">
        금 액
      </span>
    </div>
  </div>
  <div class="relative w-full" id="deduction-body">
    <div class="flex" v-for="item in deductionBodyData" :key="item.code">
      <div class="flex items-center justify-start w-1/2 h-7 m-px pl-5 bg-white">
        <span>
          {{ item.name }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/2 h-7 m-px pr-5 bg-white">
        <span>
          {{ formatNumber(item.amount) }}
        </span>
      </div>
    </div>
  </div>
  <div class="bottom-0 w-full" id="deduction-foot">
    <div class="flex" v-for="item in deductionFootData" :key="item.code">
      <div class="flex items-center justify-center w-1/2 h-7 m-px pl-5 bg-blue-300">
        <span class="font-bold text-center">
          {{ item.name }}
        </span>
      </div>
      <div class="flex items-center justify-end w-1/2 h-7 m-px pr-5 bg-blue-300">
        <span class="font-bold">
          {{ formatNumber(item.amount) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TotalSalaryTable',
  props: {
    totalSalaryData: {
      type: Array,
      required: true,
    },
    salaryItem: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      mergedTotalSalaryData: [],
      salaryBodyData: [],
      salaryFootData: [],
      deductionBodyData: [],
      deductionFootData: [],
    };
  },
  mounted() {
    this.totalDataFilter();
  },
  computed: {},
  watch: {
    totalSalaryData: {
      handler() {
        this.totalDataFilter();
      },
      immediate: true,
    },
    salaryItem: {
      handler() {
        this.totalDataFilter();
      },
      immediate: true,
    },
  },
  methods: {
    mergedTotalSalaryDataFunc() {
      this.mergedTotalSalaryData = this.totalSalaryData.map((dataItem) => {
        const matchingItem = this.salaryItem.find((item) => item.salary_item_code === dataItem.salary_item_code);
        return {
          code: dataItem.salary_item_code,
          name: matchingItem.salary_item_name,
          amount: dataItem.amount,
        };
      });
    },
    totalDataFilter() {
      this.mergedTotalSalaryDataFunc();
      this.salaryBodyData = this.mergedTotalSalaryData.filter((item) => item.code.charAt() === '1');
      this.salaryFootData = this.mergedTotalSalaryData.filter((item) => item.code.charAt() === '8');
      this.deductionBodyData = this.mergedTotalSalaryData.filter((item) => item.code.charAt() === '2');
      this.deductionFootData = this.mergedTotalSalaryData.filter((item) => item.code.charAt() === '9');
      return;
    },
  },
};
</script>
