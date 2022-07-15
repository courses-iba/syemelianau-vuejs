import { createStore, createLogger } from 'vuex';
import { v4 as uuid } from 'uuid';
import { randomState } from '@/utils';
import * as types from '@/store/mutation-types';

const debug = process.env.NODE_ENV !== 'production';

export const store = createStore({
    strict: debug,
    plugins: debug ? [createLogger()] : [],
    state() {
        return {
            cards: [...Array(18).keys()].map(value => ({
                id: uuid(),
                content: {
                    title: `Card Title ${value}`,
                    description: `
                        ${value}.
                        Some quick example text
                        to build on the card title
                        and make up the bulk of the card's content.
                    `.replace(/\s+/g, ' ').trim()
                },
                checked: null
            })),
            readonly: false,
            iSize: { fontSize: '24px' }
        };
    },
    getters: {
        cardsCount(state) {
            return state.cards.length;
        },
        iDefault(state) {
            return { ...state.iSize, color: '#586069' };
        },
        iAction(state) {
            return { ...state.iSize, color: '#1675e0' };
        }
    },
    mutations: {
        [types.CREATE](state, payload) {
            state.cards.push(payload);
        },
        [types.UPDATE](state, payload) {
            state.cards = payload;
        },
        [types.DELETE](state, payload) {
            state.cards = payload;
        },
        [types.READONLY](state, payload) {
            state.readonly = payload;
        }
    },
    actions: {
        [types.CREATE]({ commit }) {
            commit(types.CREATE, {
                id: uuid(),
                content: {
                    title: 'Edit me!',
                    description: 'Me too :)'
                },
                checked: randomState()
            });
        },
        [types.UPDATE]({ commit, state }, payload) {
            commit(types.UPDATE, state.cards.map(
                card => card.id === payload.id ? payload : card
            ));
        },
        [types.DELETE]({ commit, state }) {
            commit(types.DELETE, state.cards.filter(({ checked }) => !checked));
        },
        [types.READONLY]({ commit, state }) {
            commit(types.READONLY, !state.readonly);
        }
    }
});
