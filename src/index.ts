export type ID = string;
export interface ListItem {
    id: ID;
}

export class StrictMap<T, U> extends Map<T, U> {
    getOrFail(key: T): U {
        const item = this.get(key);
        if (item === undefined) {
            throw new Error("failed to get item from key: " + key);
        }
        return item;
    }
}

export class List<T extends ListItem> extends Array<T> {
    static fromArray<T extends ListItem>(array: T[]): List<T> {
        const list = new List<T>();
        array.forEach((item) => list.push(item));
        return list;
    }
    toIDMap(): StrictMap<ID, T> {
        const map = new StrictMap<ID, T>();
        this.forEach((entity) => map.set(entity.id, entity));
        return map;
    }
    toMap<P extends keyof T>(key: P): StrictMap<T[P], T> {
        const map = new StrictMap<T[P], T>();
        this.forEach((item) => {
            map.set(item[key], item);
        });
        return map;
    }
    toMultiMap<P extends keyof T>(key: P): StrictMap<T[P], T[]> {
        const map = new StrictMap<T[P], T[]>();
        this.forEach((item) => {
            const list = (() => {
                const storedList = map.get(item[key]);
                if (!storedList) {
                    const newList: T[] = [];
                    map.set(item[key], newList);
                    return newList;
                }
                return storedList;
            })();
            list.push(item);
        });
        return map;
    }
    extractValues<P extends keyof T>(key: P): T[P][] {
        const valueSet = new Set<T[P]>();
        this.forEach((item) => {
            if (item != null) {
                valueSet.add(item[key]);
            }
        });
        return Array.from(valueSet);
    }
    toArray(): T[] {
        return Array.from(this);
    }
}

export interface PageInfoLike {
    startCursor?: string;
    endCursor?: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface ConnectionLike<T> {
    nodes: T[];
    pageInfo: PageInfoLike;
    totalCount: number;
}

export function createEmptyConnectionLike<T>(): ConnectionLike<T> {
    return {
        nodes: [],
        pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
        },
        totalCount: 0,
    };
}
