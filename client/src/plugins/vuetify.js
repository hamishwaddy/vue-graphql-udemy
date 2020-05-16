import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#F74000',
        secondary: '#1BBAE1',
        accent: '#BF653F',
        error: '#722530',
        warning: '#A37513',
        info: '#396893',
        success: '#4caf50',
      },
    },
  },
});

// export default vuetify;
