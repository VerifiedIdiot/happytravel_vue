<template>
  <div class="flex" id="deduction-head">
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
  <div class="absolute bottom-0 w-full" id="deduction-foot">
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
  name: 'DeductionTable',
  props: {
    salaryData: {
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
      mergedSalaryData: [],
      deductionBodyData: [],
      deductionFootData: [],
    };
  },
  mounted() {
    this.salaryDataFilter();
  },
  computed: {},
  watch: {
    salaryData: {
      handler() {
        this.salaryDataFilter();
      },
      immediate: true,
    },
    salaryItem: {
      handler() {
        this.salaryDataFilter();
      },
      immediate: true,
    },
  },
  methods: {
    mergedSalaryDataFunc() {
      if (this.salaryData.length === 0 || this.salaryItem.length === 0) return;

      this.mergedSalaryData = this.salaryData.map((dataItem) => {
        const matchingItem = this.salaryItem.find((item) => item.salary_item_code === dataItem.salary_item_code);
        return {
          code: dataItem.salary_item_code,
          name: matchingItem.salary_item_name,
          amount: dataItem.amount,
        };
      });
    },
    salaryDataFilter() {
      this.mergedSalaryDataFunc();
      this.deductionBodyData = this.mergedSalaryData.filter((item) => item.code.charAt() === '2');
      this.deductionFootData = this.mergedSalaryData.filter((item) => item.code.charAt() === '9');
      return;
    },
    formatNumber(value) {
      if (!value) return '';
      return new Intl.NumberFormat().format(value);
    },
    updateAmount(event, item) {
      const value = event.target.value.replace(/,/g, '');
      item.amount = parseInt(value, 10);
      this.$emit('updateSalaryData', this.salaryData); // 변경된 데이터 전달
    },
  },
};
</script>
