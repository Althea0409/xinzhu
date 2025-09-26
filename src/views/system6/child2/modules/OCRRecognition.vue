<script setup lang="ts">
import { computed, ref } from 'vue';
import { NButton, NCard, NIcon, NSpin, NTag } from 'naive-ui';
import { CameraOutline, CheckmarkCircleOutline, DocumentTextOutline, TimeOutline } from '@vicons/ionicons5';

interface OCRResult {
  id: string;
  fileName: string;
  recognizedText: string;
  confidence: number;
  score: number;
  status: 'processing' | 'completed' | 'error';
  processingTime?: number;
}

const uploadProgress = ref(0);
const isProcessing = ref(false);
const ocrResults = ref<OCRResult[]>([]);

const stats = computed(() => ({
  totalImages: ocrResults.value.length,
  completedImages: ocrResults.value.filter(r => r.status === 'completed').length,
  averageConfidence:
    ocrResults.value.length > 0
      ? Math.round(ocrResults.value.reduce((sum, r) => sum + r.confidence, 0) / ocrResults.value.length)
      : 0
}));

function handleUpload(options: any) {
  isProcessing.value = true;
  uploadProgress.value = 0;

  // 模拟上传进度
  const progressInterval = setInterval(() => {
    uploadProgress.value += 10;
    if (uploadProgress.value >= 100) {
      clearInterval(progressInterval);
      processOCR(options.file);
    }
  }, 200);
}

function processOCR(file: File) {
  const newResult: OCRResult = {
    id: Date.now().toString(),
    fileName: file.name,
    recognizedText: '',
    confidence: 0,
    score: 0,
    status: 'processing',
    processingTime: 0
  };

  ocrResults.value.push(newResult);

  // 模拟OCR处理
  setTimeout(() => {
    const mockTexts = [
      '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
      '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
      '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。',
      '锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。'
    ];

    const result = ocrResults.value.find(r => r.id === newResult.id);
    if (result) {
      result.recognizedText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
      result.confidence = Math.floor(Math.random() * 20) + 80; // 80-100
      result.score = Math.floor(Math.random() * 30) + 70; // 70-100
      result.status = 'completed';
      result.processingTime = Math.floor(Math.random() * 3) + 2; // 2-5秒
    }

    isProcessing.value = false;
    uploadProgress.value = 0;
  }, 3000);
}

function clearResults() {
  ocrResults.value = [];
}
</script>

<template>
  <div class="ocr-container">
    <!-- 功能标题 -->
    <div class="section-header">
      <div class="header-content">
        <NIcon :component="CameraOutline" size="24" class="header-icon" />
        <div>
          <h2 class="section-title">OCR识别与自动评分</h2>
          <p class="section-subtitle">上传手写答题图片，智能识别文字并自动评分</p>
        </div>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="stats-row">
      <div class="stat-item">
        <div class="stat-number">{{ stats.totalImages }}</div>
        <div class="stat-label">总图片数</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ stats.completedImages }}</div>
        <div class="stat-label">已完成</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ stats.averageConfidence }}%</div>
        <div class="stat-label">平均置信度</div>
      </div>
    </div>

    <!-- 上传区域 -->
    <div class="upload-section">
      <NCard class="upload-card">
        <div class="upload-area">
          <NUpload :custom-request="handleUpload" accept="image/*" :show-file-list="false" :disabled="isProcessing">
            <div class="upload-content">
              <NIcon :component="CameraOutline" size="48" class="upload-icon" />
              <div class="upload-text">
                <div class="upload-title">点击或拖拽上传图片</div>
                <div class="upload-subtitle">支持 JPG、PNG 格式，单个文件不超过 10MB</div>
              </div>
            </div>
          </NUpload>

          <div v-if="isProcessing" class="processing-overlay">
            <NSpin size="large" />
            <div class="processing-text">正在处理中...</div>
            <NProgress type="line" :percentage="uploadProgress" :show-indicator="false" class="processing-progress" />
          </div>
        </div>

        <div v-if="ocrResults.length > 0" class="upload-actions">
          <NButton class="clear-btn" @click="clearResults">清空结果</NButton>
        </div>
      </NCard>
    </div>

    <!-- 识别结果 -->
    <div v-if="ocrResults.length > 0" class="results-section">
      <h3 class="results-title">识别结果</h3>
      <div class="results-grid">
        <div
          v-for="result in ocrResults"
          :key="result.id"
          class="result-card"
          :class="{ processing: result.status === 'processing' }"
        >
          <div class="result-header">
            <div class="result-filename">{{ result.fileName }}</div>
            <NTag
              :type="result.status === 'completed' ? 'success' : result.status === 'processing' ? 'info' : 'error'"
              size="small"
            >
              <template #icon>
                <NIcon :component="result.status === 'completed' ? CheckmarkCircleOutline : TimeOutline" />
              </template>
              {{ result.status === 'completed' ? '已完成' : result.status === 'processing' ? '处理中' : '错误' }}
            </NTag>
          </div>

          <div v-if="result.status === 'processing'" class="result-processing">
            <NSpin size="medium" />
            <div class="processing-label">正在识别中...</div>
          </div>

          <div v-else-if="result.status === 'completed'" class="result-content">
            <div class="recognized-text">
              <div class="text-label">识别文字：</div>
              <div class="text-content">{{ result.recognizedText }}</div>
            </div>

            <div class="result-metrics">
              <div class="metric-item">
                <div class="metric-label">置信度</div>
                <div class="confidence metric-value">{{ result.confidence }}%</div>
              </div>
              <div class="metric-item">
                <div class="metric-label">评分</div>
                <div class="metric-value score">{{ result.score }}/100</div>
              </div>
              <div class="metric-item">
                <div class="metric-label">处理时间</div>
                <div class="metric-value">{{ result.processingTime }}s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="ocrResults.length === 0 && !isProcessing" class="empty-state">
      <NEmpty description="暂无识别结果">
        <template #icon>
          <NIcon :component="DocumentTextOutline" size="48" />
        </template>
        <template #extra>
          <div class="empty-tip">上传图片开始OCR识别</div>
        </template>
      </NEmpty>
    </div>
  </div>
</template>

<style scoped>
.ocr-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-header {
  background: white;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

.section-header:hover {
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  color: #2b46fe;
  background: #f0f2ff;
  padding: 12px;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #1a1a1a;
}

.section-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
}
.stats-row {
  background: white;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

/* .stats-row:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
} */
.stat-item {
  flex: 1;
  text-align: center;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: #2b46fe;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.upload-section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-card {
  border: 1px solid #e8eaed;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.upload-card:hover {
  border-color: #2b46fe;
  background: #fafbff;
}

.upload-area {
  position: relative;
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  gap: 20px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  min-height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.upload-icon {
  color: #2b46fe;
  opacity: 0.6;
}

.upload-text {
  text-align: center;
}

.upload-title {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.upload-subtitle {
  font-size: 14px;
  color: #666;
}

.processing-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border-radius: 12px;
}

.processing-text {
  font-size: 16px;
  color: #2b46fe;
  font-weight: 500;
}

.processing-progress {
  width: 200px;
}

.upload-actions {
  padding: 16px 24px 0;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
}

.clear-btn {
  color: #666 !important;
  border-color: #d9d9d9 !important;
}

.results-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e8eaed;
}

.results-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #1a1a1a;
}

.results-grid {
  display: grid;
  gap: 16px;
}

.result-card {
  border: 1px solid #e8eaed;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;
}

.result-card:hover {
  border-color: #2b46fe;
  box-shadow: 0 2px 8px rgba(43, 70, 254, 0.1);
}

.result-card.processing {
  background: #fafbff;
  border-color: #2b46fe;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.result-filename {
  font-weight: 500;
  color: #1a1a1a;
  font-size: 14px;
}

.result-processing {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 0;
  justify-content: center;
}

.processing-label {
  color: #2b46fe;
  font-weight: 500;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.recognized-text {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.text-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
}

.text-content {
  font-size: 14px;
  color: #1a1a1a;
  line-height: 1.6;
}

.result-metrics {
  display: flex;
  gap: 24px;
}

.metric-item {
  flex: 1;
  text-align: center;
}

.metric-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 16px;
  font-weight: 600;
}

.metric-value.confidence {
  color: #52c41a;
}

.metric-value.score {
  color: #2b46fe;
}

/* .empty-state {
  background: white;
  border-radius: 12px;
  padding: 60px 24px;
  text-align: center;
  border: 1px solid #e8eaed;
} */

.empty-state {
  background: white;
  border-radius: 12px;
  padding: 60px 24px;
  text-align: center;
  border: 1px solid #e8eaed;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

/* .empty-state:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
} */

.empty-tip {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .stats-row {
    flex-direction: column;
    gap: 16px;
  }

  .result-metrics {
    flex-direction: column;
    gap: 12px;
  }

  .upload-content {
    padding: 24px;
  }
}
</style>
