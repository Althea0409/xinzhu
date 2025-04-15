<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NIcon, NModal } from 'naive-ui';
import { Document, Edit, Image, Time } from '@vicons/carbon';
import CourseForm from './modules/CourseForm.vue';
import AiChat from './modules/AiChat.vue';

const courseFormRef = ref<any>(null);
const showDetailedPlanModal = ref(false);
const showPreviewMode = ref(false);

// 显示详细教案模态框
function showDetailedPlan() {
  showDetailedPlanModal.value = true;
  showPreviewMode.value = false;
}

// 关闭详细教案模态框
function closeDetailedPlanModal() {
  showDetailedPlanModal.value = false;
  showPreviewMode.value = false;
}

// 切换到预览模式
function togglePreviewMode() {
  showPreviewMode.value = !showPreviewMode.value;
}
</script>

<template>
  <div class="h-full w-full flex bg-white dark:bg-gray-900">
    <!-- 左侧课程计划表单 -->
    <div class="flex-1 overflow-auto p-4">
      <CourseForm ref="courseFormRef" />
    </div>

    <!-- 右侧智能问答 -->
    <div class="w-80 border-l border-gray-200 bg-white lg:w-96 dark:border-gray-700 dark:bg-gray-800">
      <AiChat @show-detailed-plan="showDetailedPlan" />
    </div>

    <!-- 详细教案模态框 -->
    <NModal
      v-model:show="showDetailedPlanModal"
      class="detailed-plan-modal"
      preset="card"
      :title="showPreviewMode ? '一年级数学教案预览' : '详细教案'"
      size="huge"
      :bordered="false"
      :segmented="{
        content: true,
        footer: 'soft'
      }"
    >
      <!-- 预览模式 -->
      <div v-if="showPreviewMode" class="preview-mode">
        <div class="preview-header">
          <h1 class="preview-title mb-6 text-center text-3xl text-red-600 font-bold">
            《小学数学一年级100以内加减法》教案
          </h1>
          <table class="preview-table w-full border-collapse shadow-lg">
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 text-blue-800 font-medium">课题</td>
              <td class="w-1/3 border border-blue-200 bg-white p-3">100以内加减法</td>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 text-blue-800 font-medium">课型</td>
              <td class="w-1/3 border border-blue-200 bg-white p-3">新授课</td>
            </tr>
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 text-blue-800 font-medium">授课时间</td>
              <td class="w-1/3 border border-blue-200 bg-white p-3">45分钟</td>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 text-blue-800 font-medium">课时</td>
              <td class="w-1/3 border border-blue-200 bg-white p-3">2课时</td>
            </tr>
          </table>
        </div>

        <div class="preview-content mt-6">
          <table class="preview-table w-full border-collapse shadow-lg">
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 align-top text-blue-800 font-medium">教学目标</td>
              <td class="border border-blue-200 bg-white p-3">
                <ol class="list-decimal pl-5 space-y-2">
                  <li>使学生能够理解并熟练掌握100以内的加减法计算方法</li>
                  <li>能够运用不同的计算策略（直接计算、凑十法、分解法）进行两位数加减法计算</li>
                  <li>培养学生的计算能力和解决实际问题的能力</li>
                </ol>
              </td>
            </tr>
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 align-top text-blue-800 font-medium">教学重点</td>
              <td class="border border-blue-200 bg-white p-3">
                <ul class="list-disc pl-5 space-y-2">
                  <li>100以内加减法相关计算策略及算理的理解</li>
                  <li>数字分解与重组计算法，灵活运用凑十法进行计算</li>
                  <li>通过试算学会快速计算，提高计算速度与准确性</li>
                  <li>两位数加减法的竖式计算方法与横式计算方法</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 align-top text-blue-800 font-medium">教学难点</td>
              <td class="border border-blue-200 bg-white p-3">
                <ul class="list-disc pl-5 space-y-2">
                  <li>基于数的分解进行计算，特别是数字跨十的情况处理</li>
                  <li>包含过十加法和过十减法的正确处理方法及位置关系理解</li>
                  <li>加减混合运算中的运算顺序理解与应用</li>
                  <li>实际应用题中数学信息的提取与运算方法的选择</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 align-top text-blue-800 font-medium">教学准备</td>
              <td class="border border-blue-200 bg-white p-3">
                <ul class="list-disc pl-5 space-y-2">
                  <li>多媒体课件、电子白板</li>
                  <li>数字卡片、计数棒、小算盘</li>
                  <li>学生用书、练习纸</li>
                  <li>情境图片、模拟钱币</li>
                  <li>计时器、小组记分表</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 align-top text-blue-800 font-medium">教学设计</td>
              <td class="border border-blue-200 p-0">
                <table class="w-full border-collapse">
                  <tr>
                    <td class="w-1/6 border border-blue-200 bg-yellow-50 p-3 align-top text-yellow-800 font-medium">
                      导入
                      <br />
                      <span class="text-sm text-yellow-700 font-normal">(5分钟)</span>
                    </td>
                    <td class="border border-blue-200 bg-white p-3 align-top">
                      <div class="mb-3">
                        <p class="mb-2 text-indigo-700 font-bold">一、创设情境，激情导入</p>
                        <ol class="list-decimal pl-5 space-y-2">
                          <li>
                            <span class="text-blue-600 font-medium">【课件出示1】</span>
                            播放动画《小兔子超市购物》：小白兔和小灰兔去文具店购物，小白兔买了一本12元的图画本，一盒8元的彩笔；小灰兔买了一个15元的铅笔盒和一把6元的尺子。他们一共需要付多少钱？
                          </li>
                          <li>
                            <span class="text-blue-600 font-medium">提问：</span>
                            小朋友们，你们知道小白兔和小灰兔一共要付多少钱吗？我们怎样计算呢？（引导学生回答：12+8+15+6=）
                          </li>
                          <li>师板书课题：《100以内的加减法》，生齐读课题。</li>
                        </ol>
                      </div>
                    </td>
                    <td class="w-1/6 border border-blue-200 bg-green-50 p-3 align-top text-sm text-green-800">
                      <p>
                        通过生活情境导入，激发学生学习兴趣，同时引导学生发现日常生活中加减法的应用，为本节课的学习内容创设有意义的背景。
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="border border-blue-200 bg-yellow-50 p-3 align-top text-yellow-800 font-medium">
                      新课教学
                      <br />
                      <span class="text-sm text-yellow-700 font-normal">(30分钟)</span>
                    </td>
                    <td class="border border-blue-200 bg-white p-3 align-top">
                      <div class="mb-3">
                        <p class="mb-2 text-indigo-700 font-bold">二、新知讲解，掌握方法</p>
                        <ol class="list-decimal pl-5 space-y-3">
                          <li>
                            <span class="text-blue-600 font-medium">讲解两位数加减法的计算方法【课件出示2】</span>
                            <ol class="list-lower-alpha mt-1 pl-5 space-y-1">
                              <li>直接计算法：如23+45=68（按位相加）</li>
                              <li>凑十法：如26+7=(26+4)+3=30+3=33</li>
                              <li>数字分解法：如47-9=47-7-2=40-2=38</li>
                            </ol>
                          </li>
                          <li>教师示范计算过程，在白板上用不同颜色标记关键步骤。</li>
                          <li>
                            学生尝试计算，教师巡视指导。
                            <ol class="list-lower-alpha mt-1 pl-5 space-y-1">
                              <li>例题演示：34+20=?、57-30=?、46+7=?、52-8=?【课件出示3】</li>
                            </ol>
                          </li>
                          <li>
                            <p class="mb-1 text-indigo-600 font-bold">互动活动一：数字接龙（5分钟）</p>
                            <p class="border-l-4 border-blue-400 rounded-md bg-blue-50 p-2">
                              全班分成四组，每组学生依次说出一个数，下一位学生需要给这个数加5或减3，小组成员轮流进行。教师使用计时器，最快完成且准确率最高的小组获胜。
                            </p>
                          </li>
                          <li>
                            <p class="mb-1 text-indigo-600 font-bold">互动活动二：数学侦探（10分钟）</p>
                            <p class="border-l-4 border-purple-400 rounded-md bg-purple-50 p-2">
                              发放数学侦探卡片，每组获得一系列相关的加减法算式卡片，部分数字被隐藏，学生需要通过已知条件推理出被隐藏的数字。如：□+24=61，37-□=19。小组讨论后派代表上台展示解题思路。
                            </p>
                          </li>
                          <li>
                            <p class="mb-1 text-indigo-600 font-bold">互动活动三：智慧超市（10分钟）</p>
                            <p class="border-l-4 border-orange-400 rounded-md bg-orange-50 p-2">
                              教室前方布置超市场景，各种"商品"标有价格（均为两位数）。学生分组扮演"顾客"和"收银员"，顾客挑选2-3件商品，收银员计算总价并找零（使用100元）。
                            </p>
                          </li>
                        </ol>
                      </div>
                    </td>
                    <td class="border border-blue-200 bg-green-50 p-3 align-top text-sm text-green-800">
                      <p>
                        通过直观讲解和例题分析，帮助学生掌握100以内加减法的基本计算方法，并在实践活动中巩固所学内容。
                      </p>
                      <p class="mt-4">
                        设计三个互动环节，注重学生参与，在游戏和活动中提高计算能力，培养学生对数学的兴趣，同时发展合作能力和解决问题的能力。
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="border border-blue-200 bg-yellow-50 p-3 align-top text-yellow-800 font-medium">
                      课堂小结
                      <br />
                      <span class="text-sm text-yellow-700 font-normal">(10分钟)</span>
                    </td>
                    <td class="border border-blue-200 bg-white p-3 align-top">
                      <div class="mb-3">
                        <p class="mb-2 text-indigo-700 font-bold">四、课堂总结，巩固提高</p>
                        <ol class="list-decimal pl-5 space-y-3">
                          <li>
                            <p class="mb-1 text-indigo-600 font-bold">知识总结</p>
                            <p class="border-l-4 border-gray-400 rounded-md bg-gray-50 p-2">
                              师：今天我们学习了100以内的加减法，掌握了哪些计算方法？（学生回答）请同学们总结一下使用这些方法的关键步骤。
                            </p>
                          </li>
                          <li>
                            <p class="mb-1 text-indigo-600 font-bold">计算评比（3分钟）</p>
                            <p class="border-l-4 border-green-400 rounded-md bg-green-50 p-2">
                              进行"计算冲关"个人练习，设置基础版、进阶版和挑战版计算题。学生根据自己的能力选择并完成，教师记录完成情况。
                            </p>
                          </li>
                          <li>
                            <p class="mb-1 text-indigo-600 font-bold">布置作业</p>
                            <ol class="list-lower-alpha pl-5 space-y-1">
                              <li>完成练习册第14页的加减法练习题。</li>
                              <li>设计一张"家庭购物清单"，列出5件物品及价格，计算总价。</li>
                              <li>在日常生活中找出使用加减法的例子，记录在数学日记本上。</li>
                            </ol>
                          </li>
                        </ol>
                      </div>
                    </td>
                    <td class="border border-blue-200 bg-green-50 p-3 align-top text-sm text-green-800">
                      <p>
                        通过总结归纳和计算评比，检验学生对所学知识的掌握程度，强化重点内容。结合生活实际布置作业，培养学生在真实情境中运用数学知识解决问题的能力。
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- 详细设计模式 -->
      <div v-if="!showPreviewMode && courseFormRef" class="detailed-plan-container">
        <div class="mb-6">
          <h1 class="plan-title text-2xl text-primary font-bold">
            {{ courseFormRef.generatedDesign?.detailedPlan?.title }}
          </h1>
          <p class="plan-subtitle mt-2 text-sm text-gray-500">
            基于{{ courseFormRef.formValue?.textbook }}生成，预计授课时长：45分钟
          </p>
        </div>

        <!-- 教学目标 -->
        <div class="plan-section mb-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              一
            </div>
            教学目标
          </h2>
          <ul class="goal-list list-decimal pl-8">
            <li
              v-for="(objective, index) in courseFormRef.generatedDesign?.detailedPlan?.priorKnowledge"
              :key="index"
              class="goal-item mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ objective }}
            </li>
          </ul>
        </div>

        <!-- 教学重点与难点 -->
        <div class="plan-section mb-8 rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              二
            </div>
            教学重点与难点
          </h2>
          <div v-for="(section, sIndex) in courseFormRef.generatedDesign?.focusPoints" :key="sIndex" class="mb-4">
            <h3 class="subsection-title mb-2 text-lg text-gray-800 font-medium dark:text-gray-200">
              {{ section.title }}：
            </h3>
            <ul class="focus-list list-disc pl-8">
              <li
                v-for="(point, pIndex) in section.points"
                :key="pIndex"
                class="focus-item mb-1 text-gray-700 dark:text-gray-300"
              >
                {{ point }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 教学方法 -->
        <div class="plan-section mb-8 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              三
            </div>
            教学方法
          </h2>
          <ul class="method-list list-decimal pl-8">
            <li
              v-for="(method, index) in courseFormRef.generatedDesign?.teachingMethods"
              :key="index"
              class="method-item mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ method }}
            </li>
          </ul>
        </div>

        <!-- 教学准备 -->
        <div class="plan-section mb-8 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              四
            </div>
            教学准备
          </h2>
          <ul class="prep-list list-disc pl-8">
            <li
              v-for="(material, index) in courseFormRef.generatedDesign?.detailedPlan?.teachingTools"
              :key="index"
              class="prep-item mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ material }}
            </li>
          </ul>
        </div>

        <!-- 课堂流程 -->
        <div class="plan-section mb-8 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              五
            </div>
            教学活动与时间安排
          </h2>
          <div class="mt-4">
            <div class="procedure-timeline relative">
              <div
                v-for="(step, index) in courseFormRef.generatedDesign?.lessonFlow"
                :key="index"
                class="procedure-step relative mb-8 pl-10"
              >
                <div
                  class="step-number absolute left-2 top-0 h-8 w-8 flex items-center justify-center rounded-full bg-primary text-sm text-white -translate-x-1/2"
                >
                  {{ index + 1 }}
                </div>
                <div
                  class="step-card border border-gray-200 rounded-lg bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div class="mb-2 flex items-center justify-between">
                    <h3 class="step-title text-lg text-primary font-semibold">{{ step.title }}</h3>
                    <div class="step-time flex items-center text-gray-500">
                      <NIcon class="mr-1" size="18">
                        <Time />
                      </NIcon>
                      <span class="text-sm">{{ step.duration }}</span>
                    </div>
                  </div>
                  <p class="step-content mb-3 text-gray-700 dark:text-gray-300">{{ step.content }}</p>

                  <div v-if="step.interaction" class="interaction-section mb-3">
                    <div class="mb-1 text-sm text-purple-600 font-medium dark:text-purple-400">互动环节：</div>
                    <div
                      class="rounded-md bg-purple-50 px-3 py-2 text-sm text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                    >
                      {{ step.interaction }}
                    </div>
                  </div>

                  <div v-if="step.expectedOutcome" class="outcome-section mb-3">
                    <div class="mb-1 text-sm text-green-600 font-medium dark:text-green-400">预期成果：</div>
                    <div
                      class="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      {{ step.expectedOutcome }}
                    </div>
                  </div>

                  <div v-if="step.materials" class="materials-section">
                    <div class="mb-1 text-sm text-orange-600 font-medium dark:text-orange-400">所需材料：</div>
                    <div
                      class="rounded-md bg-orange-50 px-3 py-2 text-sm text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                    >
                      {{ step.materials }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 评价方式 -->
        <div class="plan-section mb-8 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              六
            </div>
            评价方式
          </h2>
          <div class="mb-4">
            <h3 class="subsection-title mb-2 text-lg text-gray-800 font-medium dark:text-gray-200">过程性评价：</h3>
            <ul class="evaluation-list list-disc pl-8">
              <li
                v-for="(item, index) in courseFormRef.generatedDesign?.evaluation?.formative"
                :key="index"
                class="evaluation-item mb-1 text-gray-700 dark:text-gray-300"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="mb-4">
            <h3 class="subsection-title mb-2 text-lg text-gray-800 font-medium dark:text-gray-200">总结性评价：</h3>
            <ul class="evaluation-list list-disc pl-8">
              <li
                v-for="(item, index) in courseFormRef.generatedDesign?.evaluation?.summative"
                :key="index"
                class="evaluation-item mb-1 text-gray-700 dark:text-gray-300"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 教学反思 -->
        <div class="plan-section mb-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              七
            </div>
            教学反思
          </h2>
          <ul class="reflection-list list-disc pl-8">
            <li
              v-for="(item, index) in courseFormRef.generatedDesign?.reflection"
              :key="index"
              class="reflection-item mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- 课后作业 -->
        <div class="plan-section mb-8 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              八
            </div>
            课后作业和延伸
          </h2>
          <ul class="homework-list list-disc pl-8">
            <li
              v-for="(item, index) in courseFormRef.generatedDesign?.homeworkAndReflection"
              :key="index"
              class="homework-item mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-center gap-4">
          <NButton type="primary" size="large" class="w-40">
            <template #icon>
              <NIcon><Document /></NIcon>
            </template>
            导出文档
          </NButton>
          <NButton type="info" size="large" class="w-40" @click="togglePreviewMode">
            <template #icon>
              <NIcon><Image /></NIcon>
            </template>
            {{ showPreviewMode ? '详细设计' : '预览教案' }}
          </NButton>
          <NButton type="default" ghost size="large" class="w-40" @click="closeDetailedPlanModal">
            <template #icon>
              <NIcon><Edit /></NIcon>
            </template>
            关闭
          </NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<style scoped>
.detailed-plan-container {
  max-height: 65vh;
  overflow-y: auto;
  padding-right: 12px;
  margin: 0 auto;
}

.detailed-plan-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 750px;
  max-width: 750px;
  height: auto;
  max-height: 85vh;
  margin: 0 auto;
}

.text-primary {
  color: #2b46fe;
}

:deep(.dark) .text-primary {
  color: #5b76ff;
}

:deep(.n-button) {
  font-weight: 500;
}

:deep(.n-modal) {
  max-width: 650px;
  width: 650px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
}

:deep(.n-modal-body-wrapper) {
  max-height: 85vh;
}

:deep(.n-card) {
  max-height: 85vh;
  border: 2px solid #e74c3c;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

:deep(.n-card__content) {
  padding: 16px 24px;
}

:deep(.n-card__footer) {
  padding: 16px 24px 20px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  gap: 16px;
}

:deep(.n-card__action) {
  padding: 0;
}

:deep(.n-modal-mask) {
  background-color: rgba(0, 0, 0, 0.5);
}

:deep(.n-card-header) {
  padding: 16px 24px;
  border-bottom: 1px solid #eaeaea;
}

/* 详细教案内部样式 */
.plan-title {
  font-size: 24px;
  color: #2b46fe;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.plan-subtitle {
  color: #6b7280;
  font-size: 14px;
}

.plan-section {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.plan-section:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-heading {
  font-weight: 600;
  display: flex;
  align-items: center;
  color: #2b46fe;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #2b46fe;
  color: white;
  font-weight: bold;
  margin-right: 12px;
}

.goal-list {
  padding-left: 2rem;
}

.goal-item {
  line-height: 1.6;
  margin-bottom: 8px;
  position: relative;
}

/* 教学重点与难点 */
.subsection-title {
  font-weight: 600;
  color: #333;
  margin-top: 12px;
}

.focus-list {
  padding-left: 2rem;
}

.focus-item {
  line-height: 1.6;
  position: relative;
}

/* 教学方法 */
.method-list {
  padding-left: 2rem;
}

.method-item {
  line-height: 1.6;
  margin-bottom: 10px;
}

/* 教学准备 */
.prep-list {
  padding-left: 2rem;
}

.prep-item {
  line-height: 1.6;
}

/* 课堂流程 */
.procedure-timeline {
  position: relative;
}

.procedure-timeline:before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 2px;
  width: 2px;
  background-color: #e5e7eb;
  z-index: 0;
}

.procedure-step {
  position: relative;
  z-index: 1;
}

.step-number {
  box-shadow: 0 0 0 4px white;
  z-index: 2;
  font-weight: bold;
}

.step-card {
  border-radius: 10px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.step-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.step-title {
  font-weight: 600;
  color: #2b46fe;
}

.step-time {
  color: #6b7280;
  display: flex;
  align-items: center;
}

.step-content {
  line-height: 1.6;
}

.design-intent {
  margin-top: 8px;
}

.intent-label {
  font-weight: 500;
  color: #3b82f6;
}

.intent-content {
  background-color: #eff6ff;
  border-radius: 6px;
  line-height: 1.5;
}

/* 深色模式适配 */
:deep(.dark) .step-card {
  background-color: #1f2937;
  border-color: #374151;
}

:deep(.dark) .step-number {
  box-shadow: 0 0 0 4px #111827;
}

:deep(.dark) .procedure-timeline:before {
  background-color: #374151;
}

/* 新增样式 */
.preview-mode {
  max-height: 65vh;
  overflow-y: auto;
  padding: 0 0.5rem;
}

.preview-title {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
}

.preview-title:after {
  content: '';
  position: absolute;
  width: 60%;
  height: 3px;
  bottom: 0;
  left: 20%;
  background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.8), transparent);
}

.preview-table {
  border-radius: 8px;
  overflow: hidden;
  border-spacing: 0;
  transition: all 0.3s ease;
}

.preview-table td {
  transition: background-color 0.2s ease;
}

.preview-table td.bg-blue-50:hover,
.preview-table td.bg-yellow-50:hover,
.preview-table td.bg-green-50:hover {
  background-color: rgba(59, 130, 246, 0.2);
}

.preview-content {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.dark) .preview-table {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

:deep(.dark) .preview-table td.bg-blue-50 {
  background-color: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
}

:deep(.dark) .preview-table td.bg-white {
  background-color: #1f2937;
  color: #e5e7eb;
}

:deep(.dark) .preview-table td.bg-yellow-50 {
  background-color: rgba(234, 179, 8, 0.15);
  color: #fcd34d;
}

:deep(.dark) .preview-table td.bg-green-50 {
  background-color: rgba(34, 197, 94, 0.15);
  color: #86efac;
}

:deep(.dark) .preview-table td.border {
  border-color: #374151;
}

:deep(.dark) .preview-title {
  color: #f87171;
}

:deep(.dark) .bg-blue-50,
:deep(.dark) .bg-purple-50,
:deep(.dark) .bg-orange-50,
:deep(.dark) .bg-green-50,
:deep(.dark) .bg-gray-50 {
  background-color: rgba(255, 255, 255, 0.05);
  color: #e5e7eb;
}

:deep(.dark) .border-blue-400,
:deep(.dark) .border-purple-400,
:deep(.dark) .border-orange-400,
:deep(.dark) .border-green-400,
:deep(.dark) .border-gray-400 {
  border-color: rgba(255, 255, 255, 0.3);
}

:deep(.dark) .text-indigo-700,
:deep(.dark) .text-indigo-600,
:deep(.dark) .text-blue-600 {
  color: #a5b4fc;
}

.interaction-section,
.outcome-section,
.materials-section {
  margin-top: 8px;
}

.evaluation-list,
.reflection-list,
.homework-list {
  padding-left: 2rem;
}

.evaluation-item,
.reflection-item,
.homework-item {
  line-height: 1.6;
}
</style>
