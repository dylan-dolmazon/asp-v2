<script setup lang="ts">
const step = defineModel<number>("step", { required: true });
const isOpen = defineModel<boolean>("isOpen", { required: true });

const { getPersonalsInfos, getPerformance, getStats, reset } =
  useStepperState();

const onSubmit = async () => {
  const { error } = await createPlayer({
    ...getPersonalsInfos(),
    ...getStats(),
    ...getPerformance(),
  });

  if (!error.value) {
    reset();
    step.value = 0;
    isOpen.value = false;
  }
};
</script>

<template>
  <div class="CreatePlayerSummary">
    <div class="CreatePlayerSummary-block mt-8">
      <div class="flex items-center justify-between">
        <Typo tag="h3">Informations personnelles</Typo>
        <UButton
          size="sm"
          color="primary"
          square
          variant="ghost"
          @click="() => (step = 1)"
        >
          <Icon
            name="ph:pencil-simple-line-fill"
            width="20"
            height="20"
            class="text-default"
          ></Icon>
        </UButton>
      </div>
      <div class="flex gap-6">
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--threeChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">Prénom</Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getPersonalsInfos().firstname }}
          </Typo>
        </div>
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--threeChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">Nom</Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getPersonalsInfos().lastname }}
          </Typo>
        </div>
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--threeChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">Age</Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getPersonalsInfos().age }}
          </Typo>
        </div>
      </div>
      <div class="flex gap-6">
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--twoChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">
            Taille (en Cm)
          </Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{
              getPersonalsInfos().height === 0
                ? "Non renseigné"
                : getPersonalsInfos().height
            }}
          </Typo>
        </div>
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--twoChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">
            Poids (en Kg)
          </Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{
              getPersonalsInfos().weight === 0
                ? "Non renseigné"
                : getPersonalsInfos().weight
            }}
          </Typo>
        </div>
      </div>
    </div>
    <div class="CreatePlayerSummary-block mt-8">
      <div class="flex items-center justify-between">
        <Typo tag="h3">Statistiques</Typo>
        <UButton
          size="sm"
          color="primary"
          square
          variant="ghost"
          @click="() => (step = 2)"
        >
          <Icon
            name="ph:pencil-simple-line-fill"
            width="20"
            height="20"
            class="text-default"
          ></Icon>
        </UButton>
      </div>
      <div class="flex gap-6">
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--twoChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">Poste</Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getPosition(getStats().position) }}
          </Typo>
        </div>
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--twoChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">Pied fort</Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getFooted(getStats().footed) }}
          </Typo>
        </div>
      </div>
      <div class="flex gap-6">
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--fourChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">
            Passe décisives
          </Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getStats().assists }}
          </Typo>
        </div>
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--fourChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">
            Buts marqués
          </Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getStats().goalsscored }}
          </Typo>
        </div>
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--fourChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">
            Cartons jaune
          </Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getStats().yellowcards }}
          </Typo>
        </div>
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--fourChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">
            Cartons rouge
          </Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getStats().redcards }}
          </Typo>
        </div>
      </div>
    </div>
    <div class="CreatePlayerSummary-block mt-8">
      <div class="flex items-center justify-between">
        <Typo tag="h3">Performances</Typo>
        <UButton
          size="sm"
          color="primary"
          square
          variant="ghost"
          @click="() => (step = 3)"
        >
          <Icon
            name="ph:pencil-simple-line-fill"
            width="20"
            height="20"
            class="text-default"
          ></Icon>
        </UButton>
      </div>
      <div class="flex gap-6">
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--threeChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">Défense</Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getPerformance().defending }}
          </Typo>
        </div>
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--threeChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">Vitesse</Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getPerformance().pace }}
          </Typo>
        </div>
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--threeChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">Passe</Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getPerformance().passing }}
          </Typo>
        </div>
      </div>
      <div class="flex gap-6">
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--threeChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">Drible</Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getPerformance().dribbling }}
          </Typo>
        </div>
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--threeChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">Physique</Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getPerformance().physical }}
          </Typo>
        </div>
        <div
          class="CreatePlayerSummary-info CreatePlayerSummary-info--threeChilds"
        >
          <Typo tag="p" class="CreatePlayerSummary-info-label">Tire</Typo>
          <Typo tag="p" class="CreatePlayerSummary-info-content">
            {{ getPerformance().shooting }}
          </Typo>
        </div>
      </div>
    </div>
    <UButton block class="mt-8" @click="onSubmit">Créer le joueur</UButton>
  </div>
</template>

<style scoped lang="scss">
.CreatePlayerSummary {
  &-info {
    display: flex;
    flex-direction: column;
    margin: 10px 0;

    &--twoChilds {
      width: 47%;
    }

    &--threeChilds {
      width: 30%;
    }

    &--fourChilds {
      width: 21.5%;
    }

    &-label {
      color: theme("colors.gris.800");
      padding-bottom: 5px;
    }
    &-content {
      color: theme("colors.default.DEFAULT");
      padding-left: 5px;
      border-bottom: 2px solid theme("colors.default.DEFAULT");
    }
  }

  &-block {
    border-radius: 5px;
    border: 1px solid theme("colors.gris.300");
    padding: 20px;
  }
}
</style>
