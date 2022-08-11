/**
 * Returns the parameter fitting the provided string.
 * Returns null if no query string with that name is present.
 *
 * @export
 * @param {string} param
 * @return {*}  {(string | null)}
 */
declare function getUrlParam(param: string): string | null;
/**
 * Binds all text elements with the 'data-bind-query-param' custom attribute to
 * the query string they refer to.
 *
 * E.g. data-bind-query-param="credit" taks the ?credit=1.99 param
 *
 * @export
 */
declare function bindQueryPramTexts(): void;

/**
 * Takes the duration in ms and returns a string representation.
 * If duration is longer than a day: 1d 4h
 * Else: 00:50:30
 *
 * @export
 * @param {number} duration
 * @return {*}  {string}
 */
declare function msToString(duration: number): string;
declare function getTimeStamp(date: number | string): number;

declare enum SequenceStatus {
    Upcoming = "upcoming",
    Running = "running",
    Passed = "passed",
    Disabled = "disabled"
}

declare type TimerCallbackProps = {
    text: string;
    status: SequenceStatus;
    remaining: number | null;
};
/**
 * Utility to keep track of the remaining time and status of a sequence.
 *
 * @export
 * @class Timer
 */
declare class Timer {
    private _end;
    private _start?;
    callback?: Function;
    constructor(_end: EpochTimeStamp, _start?: EpochTimeStamp | undefined, callback?: Function);
    set end(val: EpochTimeStamp);
    get status(): SequenceStatus.Upcoming | SequenceStatus.Running | SequenceStatus.Passed;
    get remaining(): number;
    /**
     * Gets called whenever there is an update in the string representation of the timer.
     *
     * @param {(props: TimerCallbackProps) => void} callback
     * @memberof Timer
     */
    onUpdate: (callback: (props: TimerCallbackProps) => void) => void;
}

declare function onDocumentReady(fn: any): void;

declare type CountdownOpts = {
    start?: number | string;
    end: number | string;
};
declare class Countdown {
    opts: CountdownOpts;
    static elementId: string;
    static elementList: NodeListOf<HTMLElement>;
    timer: Timer;
    refs: Record<string, HTMLElement | NodeListOf<HTMLElement>>;
    private $ref;
    private $text;
    private $styled;
    constructor(ref: HTMLElement, opts: CountdownOpts);
    initializeTimer(props: CountdownOpts): void;
    set(props: CountdownOpts): void;
    update(): void;
}

export { Countdown, Timer, bindQueryPramTexts, getTimeStamp, getUrlParam, msToString, onDocumentReady };
