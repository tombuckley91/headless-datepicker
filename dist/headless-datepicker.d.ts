import { ComponentPropsWithoutRef } from 'react';
import { Context } from 'react';
import { ElementType } from 'react';
import { ExoticComponent } from 'react';
import { Key } from 'react';
import { MutableRefObject } from 'react';
import { ReactNode } from 'react';
import { RefObject } from 'react';
import { UseFloatingOptions } from '@floating-ui/react-dom';

export declare type Action = `open${string}` | `close${string}` | `toggle${string}` | `next${string}` | `prev${string}` | `showYear${string}` | `showMonth${string}` | `showDay${string}` | `toggleYear${string}` | `toggleMonth${string}` | `toggleDay${string}` | 'today' | 'todayHour';

export declare type ButtonProps<ElemenElementTag extends ElementType = typeof DEFAULT_TAG_4> = Props<ElemenElementTag, DatepickerSlot, never, {
    /**
     * You can add the `Picker.id` in the end of action to specify the picker you want.
     *
     * For example `openTestPicker` will open the picker with `TestPicker` id.
     *
     * The only exception is `today` and `todayHour` since they set value for all pickers.
     *
     * The default target Picker is the parent Picker.
     * If no picker found, it will be the first Picker.
     *
     * Action can be one of these
     * - `today` set the value to today
     * - `todayHour` set the value to today with current hour
     * - `open` or `'open' + pickerId` open the calendar
     * - `close` or `'close' + pickerId` close the calendar
     * - `toggle` or `'toggle' + pickerId` close the calendar
     * - `next` or `'next' + pickerId` go to next month or year (depend on calendar mode)
     * - `prev` or `'prev' + pickerId` go to prev month or year (depend on calendar mode)
     * - `year` or `'year' + pickerId` set showing items to year
     * - `month` or `'month' + pickerId` set showing items to month
     * - `day` or `'day' + pickerId` set showing items to day
     */
    action: Action;
}>;

declare interface ComponentButton {
    <ElementTag extends ElementType = typeof DEFAULT_TAG_4>(props: ButtonProps<ElementTag> & React.RefAttributes<ElementType>): JSX.Element;
}

declare interface ComponentInput {
    <ElementTag extends ElementType = typeof DEFAULT_TAG_3>(props: InputProps<ElementTag> & React.RefAttributes<ElementType>): JSX.Element;
}

declare interface ComponentItem {
    <ElementTag extends ElementType = typeof DEFAULT_TAG_6>(props: ItemProps<ElementTag> & React.RefAttributes<ElementType>): JSX.Element;
}

declare interface ComponentItems {
    <Type extends ItemsType['type'], ElementTag extends ElementType = typeof DEFAULT_TAG_5>(props: ItemsProps<Type, ElementTag> & React.RefAttributes<ElementType>): JSX.Element;
}

declare interface ComponentPicker {
    <ElementTag extends ElementType = typeof DEFAULT_TAG_2>(props: PickerProps<ElementTag> & React.RefAttributes<ElementType>): JSX.Element;
}

declare interface ComponentProvider {
    <ElementTag extends ElementType = typeof DEFAULT_TAG>(props: DatepickerProps<ElementTag> & React.RefAttributes<ElementType>): JSX.Element;
}

export declare const config: DatepickerConfig;

export declare type DateItemType = {
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

export declare type DateParts = {
    day: number;
    month: number;
    year: number;
};

export declare const Datepicker: ComponentProvider & {
    Picker: ComponentPicker;
    Input: ComponentInput;
    Button: ComponentButton;
    Items: ComponentItems;
    Item: ComponentItem;
};

export declare type DatepickerConfig = {
    dayNames: string[];
    monthNames: string[];
    format: (date: Date | null, format: string) => string;
    parse: (date: string, format: string, referenceDate: Date | null) => Date;
    toDateParts: (date: Date) => DateParts;
} & GetDateItems;

export declare const DatepickerContext: Context<{
    state: DatepickerState;
    dispatch: (action: DatepickerContextActions) => void;
} | null>;

export declare type DatepickerContextActions = {
    type: 'action';
    payload: {
        action: Action;
        ref?: RefObject<HTMLElement | null>;
        pickerId?: undefined | string;
    };
} | {
    type: 'select';
    payload: {
        item: ItemType;
        pickerId: string | undefined;
        action?: Action;
    };
} | {
    type: 'externalValueChanged';
    payload: Date;
} | {
    type: 'defaultChanged';
    payload: Partial<DatepickerState>;
} | {
    type: 'registerPicker';
    payload: {
        id: string;
        nestedLevel: number;
        defaultType?: ItemType['type'];
        defaultOpen: boolean;
        alwaysOpen?: boolean;
    };
} | {
    type: 'unregisterPicker';
    payload: string;
};

export declare type DatepickerProps<ElemenElementTag extends ElementType = typeof DEFAULT_TAG> = Props<ElemenElementTag, DatepickerState, 'onChange' | 'defaultValue' | 'value', {
    /**
     * Default value of the date
     */
    defaultValue?: Date;
    /**
     * Value of date picker
     */
    value?: Date | null;
    /**
     * On value change
     * @param value The new date value
     * @returns void
     */
    onChange?: (value: Date | null) => void;
    /**
     * Disable keyboard navigation
     */
    disabledKeyboardNavigation?: boolean;
    /**
     * Disable calendar (it will disabled Input too)
     */
    disabled?: boolean;
    /**
     * Override calendar config
     *
     * @see DatepickerConfig
     */
    config?: DatepickerConfig;
    /**
     * 0 for Sunday
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay#return_value
     */
    startOfWeek?: number;
}>;

export declare const datePickerReducer: (state: DatepickerState, { type, payload }: DatepickerContextActions) => DatepickerState;

export declare type DatepickerSlot = {
    pickers: {
        [index: string]: {
            nestedLevel: number;
            attach: MutableRefObject<HTMLElement | null> | undefined;
            isOpen: boolean;
            alwaysOpen?: boolean;
            type?: ItemType['type'];
            defaultType?: ItemType['type'];
        };
    };
    disabled: boolean;
    value: Date | null;
    month: number;
    monthName: string;
    year: number;
    hour: number;
    minute: number;
};

export declare type DatepickerState = Omit<DatepickerSlot, 'monthName' | 'value'> & {
    startOfWeek: number;
    config: DatepickerConfig;
    valueRef: RefObject<Date | null>;
    onChange: (value: Date | null) => void;
};

declare const DEFAULT_TAG: ExoticComponent<{
    children?: ReactNode;
}>;

declare const DEFAULT_TAG_2 = "div";

declare const DEFAULT_TAG_3 = "input";

declare const DEFAULT_TAG_4 = "button";

declare const DEFAULT_TAG_5 = "div";

declare const DEFAULT_TAG_6 = "button";

export declare type GetDateItems = {
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

export declare function getSlot(state: DatepickerState): DatepickerSlot;

export declare type HourItemType = {
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

export declare type InputProps<ElemenElementTag extends ElementType = typeof DEFAULT_TAG_3> = Props<ElemenElementTag, DatepickerSlot, never, {
    /**
     * The string of tokens that used to format date
     *
     * You can pass function for custom formatting functions
     *
     * The default value is "yyyy/MM/dd"
     *
     * @see https://date-fns.org/docs/format
     * @param date current value
     * @returns string the value to show in input
     */
    format?: string | ((date: Date | null) => string);
    /**
     * Parse the value of input when changed to Date
     * It will be ignored if the format value is not function.
     *
     * If you don't provide this and format value is a function the input will be readonly
     *
     * @param date
     * @param currentDate the current value of the Date it usefull to use it for reference in parse
     * @returns
     */
    parse?: (date: string, currentDate: Date | null) => Date;
}>;

declare const itemDataAttribute: "data-calendar-item-id";

export declare type ItemProps<ElemenElementTag extends ElementType = typeof DEFAULT_TAG_6> = Props<ElemenElementTag, DatepickerSlot, typeof itemDataAttribute, {
    item: DateItemType | HourItemType;
} & Partial<Pick<ButtonProps, 'action'>>>;

export declare type ItemsProps<Type extends ItemsType['type'], ElemenElementTag extends ElementType = typeof DEFAULT_TAG_5> = Props<ElemenElementTag, {
    items: Extract<ItemsType, {
        type: Type;
    }>[];
    type: Type;
} & DatepickerSlot, never, {
    /**
     * Specifiy which type of items will calculate.
     * If it's empty you must set `defaultType` property in `Picker` component,
     * And the value will be calculated automatically.
     */
    type?: Type;
    /**
     * Scroll to selected item when mounted
     * this is only for year, minute and hour
     */
    disableAutoScroll?: boolean;
}>;

declare type ItemsType = DateItemType | HourItemType;

export declare type ItemType = DateItemType | HourItemType;

declare type OmitOurProps<Props, OmitProps extends PropertyKey = never> = Omit<Props, OmitProps | keyof OurProps<never, never>>;

declare type OurProps<Tag extends ElementType, Slot> = {
    /**
     * React Element type
     *
     * You can either use html tag as string or component name
     */
    as?: Tag;
    /**
     * You can pass function as argument to access Datepicker context values
     */
    children?: ReactNode | ((slot: Slot) => ReactNode);
    /**
     * You can use function for className to access Datepicker context values
     */
    className?: 'className' extends keyof ComponentPropsWithoutRef<Tag> ? string | ((slot: Slot) => string) : never;
};

export declare type PickerProps<ElemenElementTag extends ElementType = typeof DEFAULT_TAG_2> = Props<ElemenElementTag, DatepickerSlot, never, {
    /**
     * Set a unique id for the picker
     * It can be useful when you have multiple pickers
     * and you want to use `<Button />`
     * @see `Button.action` for more information
     */
    id?: string;
    /**
     * Set whether or not the picker should be opened by default
     * You may need to set the `attachTo` property to attach the picker to the element
     */
    defaultOpen?: boolean;
    /**
     * Ignore the internal state and show the always show the picker
     * You may need to set the `attachTo` property to attach the picker to the element
     */
    alwaysOpen?: boolean;
    /**
     * Disable hide the picker when clicked outside
     */
    disableClickOutside?: boolean;
    /**
     * Use css `display: none` to hide the picker instead of unmounting
     */
    hideOnClose?: boolean;
    /**
     * Set the default value for `<Items />`
     * You must either set the default value or set the type in the `Items` component
     */
    defaultType?: ItemType['type'];
    /**
     * The element that picker position will be calculated based on the that
     *
     * Default is the element that made picker open
     * `<Datepicker.Input />` or `<Datepicker.Button />`
     */
    attachTo?: React.RefObject<HTMLElement> | false;
    /**
     * Override the default floating-ui middlewares
     *
     * Only works if attachTo is not `false`.
     *
     * Read more at <a href="https://floating-ui.com/docs/middleware" target="_blank">Floating UI</a>
     *
     * @see https://floating-ui.com/docs/middleware
     */
    middleware?: UseFloatingOptions['middleware'];
}>;

declare type Props<Tag extends ElementType, Slot = object, OmitProps extends PropertyKey = never, Overrides = object> = OmitOurProps<ComponentPropsWithoutRef<Tag>, OmitProps | keyof Overrides> & OurProps<Tag, Slot> & Overrides;

declare type RemoveS<T extends `${string}s`> = T extends `${infer Type}s` ? Type : never;

export declare function useDatepickerContext(): {
    state: DatepickerState;
    dispatch: (action: DatepickerContextActions) => void;
};

export declare function useDatepickerSlot(): {
    slot: DatepickerSlot;
    state: DatepickerState;
    dispatch: (action: DatepickerContextActions) => void;
};

export { }
