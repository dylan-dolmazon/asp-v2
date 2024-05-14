interface InfosPersonnels
  extends Omit<
    Player,
    | "id"
    | "fullname"
    | "position"
    | "positionLabel"
    | "footed"
    | "footedLabel"
    | "goalsscored"
    | "assists"
    | "yellowcards"
    | "redcards"
    | "pace"
    | "shooting"
    | "passing"
    | "dribbling"
    | "defending"
    | "physical"
    | "country"
    | "createdAt"
    | "updatedAt"
  > {}

interface Stats
  extends Omit<
    Player,
    | "id"
    | "firstname"
    | "lastname"
    | "fullname"
    | "age"
    | "positionLabel"
    | "nationality"
    | "height"
    | "weight"
    | "footedLabel"
    | "pace"
    | "shooting"
    | "passing"
    | "dribbling"
    | "defending"
    | "physical"
    | "country"
    | "createdAt"
    | "updatedAt"
  > {}

interface Performance
  extends Omit<
    Player,
    | "id"
    | "position"
    | "positionLabel"
    | "footed"
    | "footedLabel"
    | "goalsscored"
    | "assists"
    | "yellowcards"
    | "redcards"
    | "createdAt"
    | "updatedAt"
    | "firstname"
    | "lastname"
    | "fullname"
    | "age"
    | "nationality"
    | "height"
    | "weight"
    | "country"
  > {}

interface StepperData {
  infosPersonnels: InfosPersonnels;
  stats: Stats;
  performance: Performance;
}

export const useStepperState = () => {
  const stepperState = useState<StepperData>("stepperData", () => ({
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
  }));

  const setPersonalsInfos = (infosPersonnels: InfosPersonnels) => {
    stepperState.value.infosPersonnels = infosPersonnels;
  };
  const getPersonalsInfos = () => {
    return stepperState.value.infosPersonnels;
  };

  const setStats = (stats: Stats) => {
    stepperState.value.stats = stats;
  };
  const getStats = () => {
    return stepperState.value.stats;
  };

  const setPerformance = (performance: Performance) => {
    stepperState.value.performance = performance;
  };
  const getPerformance = () => {
    return stepperState.value.performance;
  };

  const reset = () => {
    setPersonalsInfos({
      firstname: "",
      lastname: "",
      age: 0,
      nationality: "FR",
      height: 0,
      weight: 0,
    });
    setStats({
      assists: 0,
      footed: FootedFull.RIGHT,
      goalsscored: 0,
      position: PositionFull.FORWARD,
      redcards: 0,
      yellowcards: 0,
    });
    setPerformance({
      defending: 0,
      dribbling: 0,
      pace: 0,
      passing: 0,
      physical: 0,
      shooting: 0,
    });
  };

  return {
    setPersonalsInfos,
    getPerformance,
    getStats,
    getPersonalsInfos,
    setStats,
    setPerformance,
    reset,
  };
};