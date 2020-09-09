export * from './domUtils';
export * from './columnUtils';
export * from './keyboardUtils';
export * from './selectedCellUtils';
export declare function assertIsValidKey<R>(key: unknown): asserts key is keyof R;
export declare function wrapRefs<T>(...refs: readonly React.Ref<T>[]): (handle: T | null) => void;
