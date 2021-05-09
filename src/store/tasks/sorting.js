class SortingParams {
    constructor(name, order = 0, sortType = 0) {
        this.name = name
        this.order = order
        this.sortType = sortType
    }

    compareFn = (t1, t2) => {
        const comparator = SortingParams.defineComparator(typeof t1[this.name])
        return this.sortType * comparator(t1[this.name], t2[this.name])
    }

    nextSortType = () => (this.sortType + 1) % 2 - Math.floor((this.sortType + 1) / 2)

    static defineComparator(type) {
        switch (type) {
            case "number":
                return (v1, v2) => v1 - v2
            case "string":
                return (v1, v2) => v1.localeCompare(v2)
            default:
                return () => 0
        }
    }
}

export default {
    namespaced: true,
    state: {
        modParams: [
            new SortingParams('title'),
            new SortingParams('weight'),
            new SortingParams('createdAt')
        ],
        umodParams: [
            new SortingParams('id', 999, -1)
        ]
    },
    getters: {
        modParams: state => state.modParams,
        actualParams: state => state.modParams.filter(param => param.order > 0)
            .concat(state.umodParams)
            .sort((p1, p2) => p1.order - p2.order)
    },
    mutations: {
        changeParam: (state, name) => {
            const param = state.modParams.find(p => p.name === name)
            param.sortType = param.nextSortType()
            if (param.sortType === 0) {
                const oldOrder = param.order
                param.order = 0
                state.modParams.forEach(p => {
                    if (p.order > oldOrder) {
                        p.order -= 1
                    }
                })
            } else if (param.sortType === 1) {
                param.order = 1 + state.modParams.map(p => p.order)
                    .reduce((prev, curr) => {
                        if (prev < curr) {
                            return curr
                        }
                        return prev
                    })
            }
        }
    }
}