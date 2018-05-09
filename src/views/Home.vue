<template>
  <div class="mdl-grid">
    <x-quarry-table></x-quarry-table>
  </div>
</template>

<script>
import xQuarryTable from '@/components/QuarryTable'
import xNav from '@/components/Navigation'

export default {
  name: 'Home',
  components: {
    xQuarryTable,
    xNav
  }
}
</script>

<style>

</style>
