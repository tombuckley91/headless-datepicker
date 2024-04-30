import { Key } from 'react';

export declare const config: DatepickerConfig;

declare type DateItemType = {
    type: 'day';
    /**
     * remove this
     */
    key: Key;
    /**
     * Is today day or month or year depend of the type
     */
    isToday: boolean;
    isDisabled: boolean;
    isSelected: boolean;
    isHeader: true;
    /**
     * @deprecated
     */
    disabled: boolean;
    text: string;
    value: number;
} | {
    type: 'day';
    /**
     * remove this
     */
    key: Key;
    /**
     * Is today day or month or year depend of the type
     */
    isToday: boolean;
    isInCurrentMonth: boolean;
    isSelected: boolean;
    isHeader: false;
    isDisabled: boolean;
    /**
     * @deprecated
     */
    disabled: boolean;
    text: string;
    value: Date;
} | {
    type: 'month';
    /**
     * remove this
     */
    key: Key;
    /**
     * Is today day or month or year depend of the type
     */
    isToday: boolean;
    isSelected: boolean;
    isHeader: boolean;
    isDisabled: boolean;
    /**
     * @deprecated
     */
    disabled: boolean;
    text: string;
    value: number;
} | {
    type: 'year';
    /**
     * remove this
     */
    key: Key;
    /**
     * Is today day or month or year depend of the type
     */
    isToday: boolean;
    isSelected: boolean;
    isHeader: boolean;
    isDisabled: boolean;
    /**
     * @deprecated
     */
    disabled: boolean;
    text: string;
    value: number;
};

declare type DateParts = {
    day: number;
    month: number;
    year: number;
};

declare type DatepickerConfig = {
    dayNames: string[];
    monthNames: string[];
    format: (date: Date | null, format: string) => string;
    parse: (date: string, format: string, referenceDate: Date | null) => Date;
    toDateParts: (date: Date) => DateParts;
} & GetDateItems;

declare type GetDateItems = {
    [key in `${DateItemType['type']}s`]: (state: {
        type: RemoveS<key>;
        year: number;
        month: number;
        value: Date | null;
        startOfWeek: number;
    }) => Array<Extract<DateItemType, {
        type: RemoveS<key>;
    }>>;
} & {
    [key in `${HourItemType['type']}s`]: (state: {
        type: RemoveS<key>;
        hour: number;
        minute: number;
    }) => Array<Extract<HourItemType, {
        type: RemoveS<key>;
    }>>;
};

declare type HourItemType = {
    key: Key;
    type: 'hour';
    isToday: false;
    isSelected: boolean;
    isHeader: false;
    isDisabled: boolean;
    /**
     * @deprecated
     */
    disabled: false;
    value: number;
    text: string;
} | {
    key: Key;
    type: 'minute';
    isToday: false;
    isSelected: boolean;
    isHeader: false;
    isDisabled: boolean;
    /**
     * @deprecated
     */
    disabled: false;
    value: number;
    text: string;
};

declare type RemoveS<T extends `${string}s`> = T extends `${infer Type}s` ? Type : never;

export { }
