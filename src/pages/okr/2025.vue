<script setup lang="ts">
import * as echarts from 'echarts';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

// 2025 OKR Data
const okrConfig = {
  updateDate: '2025-03-25',
  objective1: {
    weight: {
      startValue: 82,
      targetValue: 72,
      currentValue: 80.5,
    },
    runningMileage: {
      startValue: 0,
      targetValue: 500,
      currentValue: 109.17,
    },
    halfMarathon: {
      startValue: 0,
      targetValue: 21.0975,
      currentValue: 10,
    }
  },
  objective2: {
  }
}

// 体重：开始值 - 当前值 / 开始值 - 目标值
const weightProgress = (okrConfig.objective1.weight.startValue - okrConfig.objective1.weight.currentValue) / (okrConfig.objective1.weight.startValue - okrConfig.objective1.weight.targetValue)

// 运动里程：开始值 - 当前值 / 开始值 - 目标值
const runningProgress = (okrConfig.objective1.runningMileage.startValue - okrConfig.objective1.runningMileage.currentValue) / (okrConfig.objective1.runningMileage.startValue - okrConfig.objective1.runningMileage.targetValue)

// 半马达成：开始值 - 当前值 / 开始值 - 目标值
const halfMarathonProgress = (okrConfig.objective1.halfMarathon.startValue - okrConfig.objective1.halfMarathon.currentValue) / (okrConfig.objective1.halfMarathon.startValue - okrConfig.objective1.halfMarathon.targetValue)

console.log(weightProgress, runningProgress, halfMarathonProgress)

const HealthAndFitnessChart = () => {
  const chartDom = document.getElementById('o1');
  if (!chartDom) return;

  const myChart = echarts.init(chartDom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  // 这里需要添加图表配置
  myChart.setOption({
    polar: {
      radius: [30, '80%']
    },
    radiusAxis: {
      type: 'category',
      data: ['Weight', 'Running Mileage', 'Half Marathon']
    },
    angleAxis: {
      max: 1,
      startAngle: 75
    },
    series: [
      {
        type: 'bar',
        data: [
          weightProgress,
          runningProgress,
          halfMarathonProgress,
        ],

        coordinateSystem: 'polar',
        label: {
          show: true,
          position: 'spider',
          formatter: '{b}'
        }
      }
    ],
    grid: {
    },
  }
  );
};

onMounted(() => {
  HealthAndFitnessChart();
});

</script>

<template>
  <main class="container max-w-[1200px] px-4 mx-auto">
    <section class="pageHeader border-b pb-12">
      <h1 class="pt-16 pb-2 text-3xl font-bold">aiokr's okr 2025</h1>
      <a class="pb-4 text-sm text-slate-400" href="https://github.com/aiokr/tripress-nuxt/blob/src/pages/okr/2025.vue"
        target="_blank">
        Last Update:
        {{ new Date(okrConfig.updateDate).toISOString().split('T')[0] }}
      </a>
    </section>
    <!--O1 Health and Fitness-->
    <section class="pb-16">
      <h2 class="pt-12 pb-6 text-2xl font-bold">Objective 1: Health and Fitness</h2>
      <div class="items-center justify-between px-3 md:px-2 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div id="o1" class="h-96 w-full"></div>
        <div>
          This year, I will focus on weight loss, keep running, and finish at least one half marathon.
          <div>
            <div><span class="font-bold">Weight: </span>{{ okrConfig.objective1.weight.currentValue }}kg / {{ okrConfig.objective1.weight.targetValue
              }}kg</div>
          </div>
        </div>
      </div>
    </section>
    <!--O2 Capacity Enhancement-->
    <section class="pb-16">
      <h2 class="pt-12 pb-6 text-2xl font-bold">Objective 2: Capacity Enhancements</h2>
    </section>
  </main>
</template>