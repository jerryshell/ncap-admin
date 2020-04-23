<template>
  <el-dropdown @command="onChangeLocale" placement="bottom" size="small">
    <el-button class="d2-mr btn-text can-hover" type="text">
      <d2-icon name="language" style="font-size: 16px;"/>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :command="language.value"
        :key="language.value"
        v-for="language in $languages">
        <d2-icon :name="$i18n.locale === language.value ? 'dot-circle-o' : 'circle-o'" class="d2-mr-5"/>
        {{ language.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import localeMixin from '@/locales/mixin.js'

export default {
  mixins: [
    localeMixin,
  ],
}
</script>
