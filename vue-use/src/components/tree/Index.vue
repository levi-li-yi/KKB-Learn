<template>
  <div>
    <ul>
      <Item :model="treeData"/>
    </ul>
  </div>
</template>

<script>
import Item from './Item';

export default {
  components: {
    Item
  },
  data() {
    return {
      treeData: {
        title: '根',
        children: [
          {
            title: '1-1'
          },
          {
            title: '1-2'
          },
          {
            title: '1-3',
            children: [
              {
                title: '2-1'
              },
              {
                title: '2-2'
              },
              {
                title: '2-3'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
<style>
</style>