import Vue from "vue";
import Vuex from "vuex";
import conversion from "@/js/utils/conversion";
import has from "@/js/utils/has";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      isReady: false,
      configuration: {},
      status: {},
      scripts: [],
      scriptsOriginal: [],
  },
  mutations: {
      configuration(state, configuration) {
          state.configuration = configuration;
      },
      status(state, status) {
          if (typeof status.scripts === "object") {
              const scripts = [];
              Object.keys(status.scripts).forEach(file => {
                  if (file === "$PRELOAD$") {
                      return;
                  }
                  const script = status.scripts[file];
                  script.last_used_timestamp_string = conversion(conversion.TYPE.TIME, script.last_used_timestamp);
                  script.memory_consumption_string = conversion(conversion.TYPE.SIZE, script.memory_consumption);
                  if (has(script, "timestamp")) {
                      script.timestamp_string = conversion(conversion.TYPE.TIME, script.timestamp);
                  }
                  scripts.push({
                      file,
                      ...script,
                  })
              });
              state.scripts = scripts;
          }
          state.status = status;
      },
      ready(state) {
          state.isReady = true;
      },
  },
  actions: {
      opcacheData({ commit }, data) {
          if (has(data, "configuration") && has(data, "status")) {
              commit("configuration", data.configuration);
              commit("status", data.status);
              commit("ready");
          }
      },
  },
});
