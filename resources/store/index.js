import Vue from "vue"
import Vuex from "vuex"
import conversion from "../js/utils/conversion";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      isReady: false,
      configuration: {},
      status: {},
      scripts: [],
      scriptsOriginal: []
  },
  mutations: {
      configuration(state, configuration) {
          state.configuration = configuration;
      },
      status(state, status) {
          if (typeof status.scripts === "object" && Object.keys(status.scripts).length !== 0) {
              const scripts = [];
              for (const file of Object.keys(status.scripts)) {
                  const script = status.scripts[file];
                  script.last_used_timestamp_string = conversion.timeConversion(script.last_used_timestamp);
                  script.memory_consumption_string = conversion.sizeConversion(script.memory_consumption);
                  if (script.timestamp) {
                      script.timestamp_string = conversion.timeConversion(script.timestamp);
                  }
                  scripts.push({
                      file,
                      ...script
                  })
              }
              state.scripts = scripts;
          }
          state.status = status;
      },
      ready(state) {
          state.isReady = true;
      }
  },
  actions: {
      opcacheData(context, data) {
          if (Object.prototype.hasOwnProperty.call(data, "configuration") && Object.prototype.hasOwnProperty.call(data, "status")) {
              context.commit("configuration", data.configuration);
              context.commit("status", data.status);
              context.commit("ready")
          }
      }
  },
})
