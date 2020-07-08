import * as React from 'react';

/**
 * Returns a callback that will not execute right away when called, but will instead execute next time all the state has been synchronised.
 * This is useful to invoke when you make a series of state changes that you want to know are applied before calling an existing callback or block of code.
 */
export function useCallbackAwaitStateSync<T extends (...args: Array<any>) => void>(callback: T): T {
    // State that contains a queue of pending executions.
    const [pendingExecutions, setPendingExecutions] = React.useState<Array<PendingExecution>>([]);

    // Method that can be invoked to start a callback.
    const scheduleCallback: T = React.useCallback((...argsx: Array<any>): void => {
        setPendingExecutions(prevState => {
            prevState.push({ schedule: new Date(), args: argsx });
            return prevState;
        });
    }, [setPendingExecutions]) as T;

    // Run any scheduled executions of the callback if we need to.
    React.useEffect(() => {
        if (!pendingExecutions.length) {
            return;
        }

        // Run the executions.
        for (const execution of pendingExecutions) {
            callback(...execution.args);
        }

        // Remove the items we ran from the state.
        setPendingExecutions(prevState => prevState.filter(item => !pendingExecutions.find(it => item === it)));
    }, [pendingExecutions, callback]);

    return scheduleCallback;
}

/**
 * An execution that is pending to be executed.
 */
interface PendingExecution {
    schedule: Date,
    args: Array<any>,
}
