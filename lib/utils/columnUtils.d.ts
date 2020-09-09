import { Column, CalculatedColumn, FormatterProps } from '../types';
interface Metrics<R, SR> {
    rawColumns: readonly Column<R, SR>[];
    columnWidths: ReadonlyMap<string, number>;
    minColumnWidth: number;
    viewportWidth: number;
    defaultResizable: boolean;
    defaultSortable: boolean;
    defaultFormatter: React.ComponentType<FormatterProps<R, SR>>;
    rawGroupBy?: readonly string[];
}
interface ColumnMetrics<TRow, TSummaryRow> {
    columns: readonly CalculatedColumn<TRow, TSummaryRow>[];
    lastFrozenColumnIndex: number;
    totalFrozenColumnWidth: number;
    totalColumnWidth: number;
    groupBy: readonly string[];
}
export declare function getColumnMetrics<R, SR>(metrics: Metrics<R, SR>): ColumnMetrics<R, SR>;
export declare function canEdit<R, SR>(column: Column<R, SR>, row: R): boolean;
export declare function getColumnScrollPosition<R, SR>(columns: readonly CalculatedColumn<R, SR>[], idx: number, currentScrollLeft: number, currentClientWidth: number): number;
export {};
