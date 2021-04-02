export const state = {
  theme: { dark: true },
  drawer: { expanded: true },
  server: { connected: false },
  loading: false,
};

export const getters = {
  $theme: ({ theme }) => theme,
  $drawer: ({ drawer }) => drawer,
  $server: ({ server }) => server
};

export const mutations = {
  setState: (state, payload) => {
    Object.keys(payload).forEach((key) => {
      state[key] = payload[key];
    });
  },
};
