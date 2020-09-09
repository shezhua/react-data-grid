import { CalculatedColumn, Column } from '../types';
import { DataGridProps } from '../DataGrid';
declare type SharedDataGridProps<R, K extends keyof R, SR> = Pick<DataGridProps<R, K, SR>, 'defaultColumnOptions' | 'rowGrouper'>;
interface ViewportColumnsArgs<R, K extends keyof R, SR> extends SharedDataGridProps<R, K, SR> {
    rawColumns: readonly Column<R, SR>[];
    rawGroupBy?: readonly string[];
    viewportWidth: number;
    scrollLeft: number;
    columnWidths: ReadonlyMap<string, number>;
}
export declare function useViewportColumns<R, K extends keyof R, SR>({ rawColumns, columnWidths, viewportWidth, scrollLeft, defaultColumnOptions, rawGroupBy, rowGrouper }: ViewportColumnsArgs<R, K, SR>): {
    columns: readonly CalculatedColumn<R, SR>[];
    viewportColumns: readonly CalculatedColumn<R, SR>[];
    totalColumnWidth: number;
    lastFrozenColumnIndex: number;
    totalFrozenColumnWidth: number;
    groupBy: readonly string[];
};
export {};
