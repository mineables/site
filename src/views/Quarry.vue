<template>
  <div>
    <section id="quarry">
        <div class="container">
            <div class="row d-flex">
                <x-quarry-table></x-quarry-table>
            </div>
        </div>
    </section>
  </div>
</template>

<script>

import xQuarryTable from '@/components/QuarryTable'
export default {
  name: 'Quarry',
  components: {
    xQuarryTable
  }
}
</script>

<style>

</style>
