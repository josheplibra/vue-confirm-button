<template>
  <div>
    <b-btn ref="button" :id="buttonId" :disabled="disabled" :size="btnSize" :variant="btnVariant" :hidden="hidden" @click="onClick">
      {{ btnTitle }}
    </b-btn>
    <b-popover ref="popover" :target="buttonId" triggers="click" placement="auto" container="myContainer" @show="onShow" @shown="onShown" @hidden="onHidden">
      <template slot="title">
        {{ messageTitle }}
      </template>
      <div class="buttons">
        <b-btn ref="btnOk" @click="onOk" :size="btnSize" :variant="okVariant">{{ okTitle }}</b-btn>
        <b-btn @click="onCancel" :size="btnSize" :variant="cancelVariant">{{ cancelTitle }}</b-btn>
      </div>
    </b-popover>
  </div>
</template>

<script>
export default {
  name: 'vueConfirmButton',
  created () {
    this.buttonId = 'vcfbtn-' + this.guid()
  },
  data () {
    return {
      buttonId: '',
      disabled: false
    }
  },
  props: {
    btnTitle: {
      type: String,
      default () {
        return 'Button Title'
      }
    },
    btnVariant: {
      type: String,
      default () {
        return 'primary'
      }
    },
    btnSize: {
      type: String,
      default () {
        return ''
      }
    },
    messageTitle: {
      type: String,
      default () {
        return 'Are you sure?'
      }
    },
    okTitle: {
      type: String,
      default () {
        return 'Yes'
      }
    },
    okVariant: {
      type: String,
      default () {
        return 'primary'
      }
    },
    cancelTitle: {
      type: String,
      default () {
        return 'No'
      }
    },
    cancelVariant: {
      type: String,
      default () {
        return 'secondary'
      }
    },
    hidden: {
      type: Boolean,
      default () {
        return false;
      }
    },
    vcfbtnRefs: {
      type: Object,
      default () {
        return null
      }
    },
    exclusive: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    guid () {
      function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
      }
      return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0,3) + "-" + s4() + "-" + s4() + s4() + s4()).toLowerCase()
    },
    focusRef (ref) {
      // Some references may be a component, functional component, or plain element
      // This handles that check before focusing, assuming a focus() method exists
      // We do this in a double nextTick to ensure components have updated & popover positioned first
      this.$nextTick(() => {
        this.$nextTick(() => { (ref.$el || ref).focus() })
      })
    },
    onCancel () {
      // Emitting 'close' on the popover will trigger it to hide for us
      this.closePopover()
      this.$emit('cancel')
    },
    onOk () {
      this.closePopover()
      this.$emit('ok')
    },
    onShow () {
      // Disable our trigger button to prevent popover closing on second click
      this.disabled = true
    },
    onShown () {
      // Called just after the popover has been shown
      // Transfer focus to the first input
      this.focusRef(this.$refs.btnOk)
    },
    onHidden () {
      // Called just after the popover has finished hiding
      // We re-enable our button
      this.disabled = false
      // And bring focus back to it
      this.focusRef(this.$refs.button)
    },
    closePopover () {
      this.$refs.popover.$emit('close')
    },
    onClick () {
      if (this.exclusive) {
        if (this.vcfbtnRefs) {
          this.closeOtherVCfBtn(this.vcfbtnRefs)
        } else {
          this.closeOtherVCfBtn(this.$parent.$parent.$refs)
          this.closeOtherVCfBtn(this.$parent.$refs)
        }
      }
    },
    closeOtherVCfBtn (refObjects) {
      for (var variable in refObjects) {
        if (refObjects.hasOwnProperty(variable) && refObjects[variable] !== this &&
        refObjects[variable].hasOwnProperty('$options') &&
        refObjects[variable].$options._componentTag === this.$options._componentTag) {
          refObjects[variable].closePopover()
        }
      }
    }
  },
  filters: {
  }
}
</script>

<style>
.buttons {
  display: inline-block;
}
</style>
