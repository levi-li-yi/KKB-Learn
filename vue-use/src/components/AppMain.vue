<template>
  <div>
    <form-page></form-page>
    <Tree></Tree>
  </div>
</template>
<script>
import FormPage from './form/Index';
import Tree from './tree/Index';

export default {
  components: {
    FormPage,
    Tree
  },
  methods: {
  }
};
</script>