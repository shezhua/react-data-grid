import React from 'react';
import { CellRendererProps, SharedEditorContainerProps, SharedEditor2Props } from './types';
declare type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>, 'rowIdx' | 'row' | 'column'>;
interface EditCellRendererProps<R, SR> extends SharedCellRendererProps<R, SR>, Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
    editorPortalTarget: Element;
    editorContainerProps: SharedEditorContainerProps;
    editor2Props: SharedEditor2Props<R>;
}
declare const _default: <R, SR = unknown>(props: EditCellRendererProps<R, SR> & React.RefAttributes<HTMLDivElement>) => JSX.Element;
export default _default;
