
export enum GridDataFilterType {
    /** For single text field */
    text=0,
    /** For object, require at least {key: keyValue, text: 'text value'} IDropDownOption */
    lookup=1,
    /** For a datetime value, render as slider */
    date=2,
    /** For a date time value, render as two datepicker */
    dateBetwenAnd=3

}
export interface IGridDataFilterValue {
    fieldName: string;
    label: string;
    filterType: GridDataFilterType;
}