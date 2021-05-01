class FiltrationParam {
    constructor(name, options, operator) {
        this.name = name
        this.options = options
        this.operator = operator
    }

    filterFn = task => {
        const expr = this.options.map(opt => opt.filterFn(task[this.name], opt.value)).join(this.operator)
        return eval(expr)
    }

    isActual = () => {
        return this.options.filter(opt => opt.value !== '' && opt.value !== false).length !== 0
    }
}

class FilterOption {
    constructor(name, value, filterFn) {
        this.name = name
        this.value = value
        this.filterFn = filterFn
    }
}

export default {
    namespaced: true,
    state: {
        params: [
            new FiltrationParam(
                'isDone',
                [
                    new FilterOption('done', false, (tv, ov) => tv === ov),
                    new FilterOption('not done', false, (tv, ov) => tv !== ov)
                ],
                '||'
            ),
            new FiltrationParam(
                'weight',
                [
                    new FilterOption('from', '', (tv, ov) => tv >= parseInt(ov) || ov.length === 0),
                    new FilterOption('to', '', (tv, ov) => tv <= parseInt(ov) || ov.length === 0)
                ],
                '&&'
            )
        ]
    },
    getters: {
        allParams: state => state.params,
        actualParams: state => state.params.filter(param => param.isActual())
    },
    mutations: {
        changeOptStatus: (state, {paramName, optName}) => {
            const opt = state.params.find(param => param.name === paramName).options.find(opt => opt.name === optName)
            opt.value = !opt.value
        },
        changeOptValue: (state, {paramName, optName, val}) => {
            console.log(val)
            const opt = state.params.find(param => param.name === paramName).options.find(opt => opt.name === optName)
            opt.value = val
        }
    }
}