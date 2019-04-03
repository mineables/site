<template>
  <div>
    <section id="quarry">
        <div class="container">
            <h2 class="header-text">Mineable Tokens</h2>
            <x-quarry-table></x-quarry-table>
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
