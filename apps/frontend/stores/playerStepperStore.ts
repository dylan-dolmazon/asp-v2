const usePlayerStepperStore = (id: string) =>
  defineStore({
    id,
    state: (): StepperData => ({
      infosPersonnels: {
        firstname: "",
        lastname: "",
        age: 0,
        nationality: "FR",
        height: 0,
        weight: 0,
      },
      stats: {
        assists: 0,
        footed: FootedFull.RIGHT,
        goalsscored: 0,
        position: PositionFull.FORWARD,
        redcards: 0,
        yellowcards: 0,
      },
      performance: {
        defending: 0,
        dribbling: 0,
        pace: 0,
        passing: 0,
        physical: 0,
        shooting: 0,
      },
    }),
    actions: {
      setPersonalsInfos(infosPersonnels: InfosPersonnels) {
        this.infosPersonnels = infosPersonnels;
      },

      setStats(stats: Stats) {
        this.stats = stats;
      },

      setPerformance(performance: FifaStats) {
        this.performance = performance;
      },

      reset() {
        this.infosPersonnels = {
          firstname: "",
          lastname: "",
          age: 0,
          nationality: "FR",
          height: 0,
          weight: 0,
        };
        this.stats = {
          assists: 0,
          footed: FootedFull.RIGHT,
          goalsscored: 0,
          position: PositionFull.FORWARD,
          redcards: 0,
          yellowcards: 0,
        };
        this.performance = {
          defending: 0,
          dribbling: 0,
          pace: 0,
          passing: 0,
          physical: 0,
          shooting: 0,
        };
      },
    },
    getters: {
      getPersonalsInfos: (state) => state.infosPersonnels,
      getStats: (state) => state.stats,
      getPerformance: (state) => state.performance,
    },
  });

export const useCreatePlayerStepperStore = usePlayerStepperStore(
  "create-player-store"
);

export const useModifyPlayerStepperStore = usePlayerStepperStore(
  "modify-player-store"
);
