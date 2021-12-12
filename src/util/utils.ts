import type { ComponentPublicInstance } from 'vue';
export function useComponentMock<T extends ComponentPublicInstance>() {
  return {
    propsConstructor: <G extends T['$props']>(props: G) => props,
    dataConstructor: <D extends T['$data']>(data: D) => data,
    slotsConstructor: <S extends T['$slots']>(slots: S) => slots,
    attrsConstructor: <S extends T['$attrs']>(attrs: S) => attrs,
  };
}
