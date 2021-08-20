const { List } = require('immutable');
const { produce } = require('immer');

const N = Math.round(2 * Math.pow(10, 4));
console.info(`N=${N}`);
const ITEM = { a: 3 };

const timeit = (f, what) => {
    const started = new Date();
    const result = f();
    const ended = new Date();
    const diff = ended - started;
    console.info(`"${what}" took ${diff / 1000} seconds!`);
    return [what, result, diff];
};

const timeDiff = (timedA, timedB) => {
    const ta = timedA[2];
    const tb = timedB[2];
    let fasterOne = null;
    let slowerOne = null;
    let same = false;
    if (ta > tb) {
        fasterOne = timedB;
        slowerOne = timedA;
    } else if (ta < tb) {
        fasterOne = timedA;
        slowerOne = timedB;
    } else {
        same = true;
    }
    if (same) {
        console.info(`"${timedA[0]}" and "${timedB[0]}" took exactly the same time to execute!`);
    } else {
        const diff = slowerOne[2] - fasterOne[2];
        console.info(`"${fasterOne[0]}" was faster than "${slowerOne[0]}" by ${diff / 1000} seconds.`);
    }
};

const spreadTest = () => {
    let arr = [];
    for (let i = 0; i < N; ++i) {
        const newItem = ITEM;
        arr = [...arr, newItem]
    }
};


const pushTest = () => {
    let arr = { data: [] };
    for (let i = 0; i < N; ++i) {
        arr = Object.assign({}, arr);
        const newItem = ITEM;
        arr.data.push(ITEM);
    }
};

const immTest = () => {
    let arr = List([]);
    for (let i = 0; i < N; ++i) {
        const newItem = ITEM;
        arr.push(newItem);
    }
};

const immerTest = () => {
    let arr = [];
    for (let i = 0; i < N; ++i) {
        produce(arr, draft => {
            const newItem = ITEM;
            draft.push(newItem);
        });
    }
};

const timedSpread = timeit(spreadTest, "spread & add");
const timedPush = timeit(pushTest, "saving the old array reference");
const timedImm = timeit(immTest, "Immutable.js List");
const timedImmer = timeit(immerTest, "Immer");
timeDiff(timedSpread, timedPush);
timeDiff(timedSpread, timedImm);
timeDiff(timedImm, timedImmer);
