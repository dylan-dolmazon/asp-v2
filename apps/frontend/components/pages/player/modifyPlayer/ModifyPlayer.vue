<script setup lang="ts">
const isOpen = defineModel<boolean>("isOpen", { required: true });
const playerId = defineModel<Number>("playerId", { required: true });

const { pending, data: player } = await getPlayer(playerId);

const currentStep = ref(1);
const maxClickableStep = ref(1);

watch(currentStep, (value) => {
  maxClickableStep.value = value--;
});
</script>

<template>
  <USlideover v-model="isOpen">
    <UCard class="flex flex-col flex-1">
      <template #header>
        <div class="flex items-center">
          <Typo tag="h3" class="text-center w-full text-default">
            Modifier les informations de {{ player?.fullname }} !
          </Typo>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="isOpen = false"
          />
        </div>
      </template>

      <Stepper
        :steps="[1, 2, 3, 4]"
        v-model="currentStep"
        :maxClickableStep="maxClickableStep"
        v-if="player && !pending"
      >
        <template v-slot:step-1>
          <ModifyPlayerStep1
            v-model="currentStep"
            :firstname="player.firstname"
            :lastname="player.lastname"
            :age="player.age"
            :height="player.height"
            :weight="player.weight"
            :nationality="player.nationality"
          />
        </template>
        <template v-slot:step-2>
          <ModifyPlayerStep2
            v-model="currentStep"
            :footed="player.footed"
            :position="player.position"
            :assists="player.assists"
            :goalsscored="player.goalsscored"
            :redcards="player.redcards"
            :yellowcards="player.yellowcards"
          />
        </template>
        <template v-slot:step-3>
          <ModifyPlayerStep3
            v-model="currentStep"
            :defending="player.defending"
            :pace="player.pace"
            :physical="player.physical"
            :passing="player.passing"
            :dribbling="player.dribbling"
            :shooting="player.shooting"
          />
        </template>
        <template v-slot:step-4>
          <ModifyPlayerSummary
            v-model:step="currentStep"
            v-model:isOpen="isOpen"
            :player="player"
          />
        </template>
      </Stepper>
    </UCard>
  </USlideover>
</template>
