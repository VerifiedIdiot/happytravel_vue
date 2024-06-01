<template>
    <div>
        <ul>
            <li v-for="pkg in packages" :key="pkg.package_code">{{ pkg.package_name }} - {{ pkg.country }} - {{ pkg.start_date }} - {{ pkg.end_date }} - {{ pkg.sale_start_date }} - {{ pkg.sale_end_date }} - {{pkg.assign_code}}</li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getPackageList } from '@/api/sales/PackageApi';

export default {
    name: 'PackageDashboard',
    setup() {
        const packages = ref([]);
        onMounted(async () => {
            try {
                const empId = sessionStorage.getItem('empId') || 'EMP30002';
                const params = { empId }; 

                const data = await getPackageList(params); // params 전달
                packages.value = data; 
            } catch (error) {
                console.error('Failed to fetch packages:', error);
            }
        });

        return {
            packages
        };
    }
}
</script>

<style lang="scss">

</style>
