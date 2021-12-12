import { useElementVisibility } from '@vueuse/core';
import { watch, ref } from 'vue';

type Param = Parameters<typeof useElementVisibility>['0'];

export function useLazyLoad(el: Param) {
  const targetIsVisible = useElementVisibility(el);

  const loadFlag = ref(false);

  watch(targetIsVisible, (newVal, oldVal) => {
    if (newVal && !oldVal) {
      loadFlag.value = true;
    }
  });

  return loadFlag;
}
