import { createStore, createLogger } from 'vuex';
import { v4 as uuid } from 'uuid';

import { randomState } from '@/utils';
import * as types from '@/store/mutation.types';
import { getPokemon } from '@/services/pokemon.service';

const debug = process.env.NODE_ENV !== 'production';

export const store = createStore({
    strict: debug,
    plugins: debug ? [createLogger()] : [],
    state() {
        return {
            cards: [],
            readonly: false,
            loading: true,
            error: null,
            iSize: { fontSize: '24px' },
            loader: '#36d7b7',
            credentials: { email: '', password: '' }
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
        [types.READONLY](state, payload) {
            state.readonly = payload;
        },
        [types.LOAD](state, payload) {
            state.loading = payload;
        },
        [types.ERROR](state, payload) {
            state.error = payload;
        },
        [types.LOGIN](state, payload) {
            state.credentials = payload;
        },
    },
    actions: {
        getCards({ commit }) {
            commit(types.LOAD, true);
            getPokemon().then(response => {
                const pokemonCards = response.data.slice(0, 15).map(pokemon => ({
                    id: pokemon.Number,
                    content: {
                        title: pokemon.Name,
                        description: pokemon.About
                    },
                    checked: null
                }));
                commit(types.UPDATE, pokemonCards);
                commit(types.LOAD, false);
            }).catch(reason => {
                commit(types.ERROR, reason.message);
                commit(types.LOAD, false);
            });
        },
        createCard({ commit }) {
            commit(types.CREATE, {
                id: uuid(),
                content: {
                    title: 'Edit me!',
                    description: 'Me too :)'
                },
                checked: randomState()
            });
        },
        updateCard({ commit, state }, payload) {
            commit(types.UPDATE, state.cards.map(
                card => card.id === payload.id ? payload : card
            ));
        },
        deleteCards({ commit, state }) {
            commit(types.UPDATE, state.cards.filter(({ checked }) => !checked));
        },
        toggleReadonly({ commit, state }) {
            commit(types.READONLY, !state.readonly);
        },
        login({ commit }, payload) {
            commit(types.LOGIN, payload);
        }
    }
});
