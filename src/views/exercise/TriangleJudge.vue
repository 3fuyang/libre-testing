<template>
  <div class="flex-wrapper">
    <div class="left-flex-item">
      <n-tabs>
        <n-tab-pane name="Question" tab="问题描述">
          <n-card 
            class="output" 
            size="small" 
            header-style="padding: .8em;">
            <template #header>
              Question 01. 判断三角形类型
            </template>
            <p class="subtitle">算法思想</p>
            <p class="text-body">
              首先判断其两边之和是否大于第三边，若大于则判断可以构成三角形，再进一步判断该三角形是什么三角形，并计算这个三角形的面积；否则不能构成三角形。
              <br/>① 从键盘输入三角形的三条边。
              <br/>② 判断两边之和是否大于第三边。
              <br/>③ 若条件成立则判断可构成三角形，计算其面积，并判断其类型；否则判断其不能构成三角形。
              <br/>④ 在类型判断中首先判断其是否三边相等，条件成立则判断其为等边三角形；否则判断其是否有两边相等，条件成立则判断其为等腰三角形；否则判断其是否有两边的平方和等于第三边的平方，条件成立则判断其为直角三角形；否则判断其为普通三角形。
            </p>
            <p class="subtitle">代码实现</p>
            <n-card 
              class="code-block" 
              embedded 
              :bordered="false" 
              content-style="padding: .5em;">
              <n-scrollbar style="max-height: 42vh;">
                <n-code 
                  :hljs="hljs" 
                  :code="code" 
                  language="js"></n-code>
              </n-scrollbar>
            </n-card>
          </n-card>
        </n-tab-pane>
        <n-tab-pane name="Result" tab="测试结果">
          <n-card 
            class="output" 
            size="small" 
            header-style="padding: .8em;">
            <template #header>
              Testing Result
            </template>
            <!-- 打印测试结果 -->
            <n-data-table
              :bordered="false"
              :columns="columns"
              :data="result"
              :pagination="pagination">
            </n-data-table>
          </n-card>          
        </n-tab-pane>    
      </n-tabs>
    </div>
    <div class="right-flex-item">
      <n-card class="upload-box" size="small" header-style="padding: .8em;margin-bottom: .8em;">
        <template #header>
          Program Test
        </template>
        <p class="subtitle">Step 01. 选择用例集</p>
        <n-space vertical>
          <n-cascader
            class="cascader-input"
            v-model:value="usecaseType"
            :options="options"
            :show-path="false"
            :check-strategy="'child'"
            placeholder="Click to select"/>
        </n-space>
        <p class="subtitle">Step 02. 上传用例集 (Optional)</p>
        <n-space justify="center">
          <n-upload
            ref="uploadRef"
            action="#"
            :default-upload="false"
            accept=".csv"
            @change="handleChange">
            <n-upload-dragger class="upload-content">
              <div style="margin-bottom: 12px">
                <n-icon size="2.5em" :depth="3">
                  <cloud-download-outline />
                </n-icon>
              </div>
              <n-text>
                点击或者拖动文件到该区域来上传
              </n-text>
              <n-p depth="3" style="margin-top: .5em;">
                请上传 .csv 格式的文件<br/>(若上面已经选择了测试集，请直接跳转到第三步)
              </n-p>                                      
            </n-upload-dragger>
          </n-upload>
        </n-space>
        <p class="subtitle">Step 03. 运行测试集</p>
        <n-space justify="center">
          <n-button
            class="upload-btn"
            :disabled="!fileListLength"
            @click="handleUpload"
            strong
            type="primary">
            开始测试
          </n-button>
        </n-space>
      </n-card>
    </div>
  </div>
</template>

<script setup>
import { NTabs, NTabPane, NCard, NCode, NScrollbar, NSpace, NCascader, NUpload, NUploadDragger, NIcon, NText, NP, NButton, NDataTable } from 'naive-ui'
import { ref } from 'vue'
import { CloudDownloadOutline } from '@vicons/ionicons5'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import Papa from 'papaparse'
const usecaseType = ref(null)
const options = [
  {
    label: '边界值',
    value: 'boundary-value',
    children: [
      {
        label: '基本边界值',
        value: 'basic-boundary',        
      },
      {
        label: '健壮边界值',
        value: 'robust-boundary',        
      },
      {
        label: '最坏边界值',
        value: 'worst-boundary',        
      },            
    ]
  },
  {
    label: '等价类',
    value: 'equivalence',
    children: [
      {
        label: '弱一般等价类',
        value: 'weak-equivalence',        
      },
      {
        label: '强一般等价类',
        value: 'strong-equivalence',        
      },
      {
        label: '弱健壮等价类',
        value: 'weak-robust',        
      },
      {
        label: '强健壮等价类',
        value: 'strong-robust',        
      },                  
    ]    
  }
]

const createColumns = (rawData) => {
  const cols = []

}

const uploadRef = ref(null)
const fileData = ref(null)
const fileListLength = ref(0)
function handleChange(options){
  fileListLength.value = options.fileList.length;
  if(fileListLength.value !== 0){
    // 获取上传的文件对象
    console.log(options.fileList[0].file)
    Papa.parse(options.fileList[0].file, {
      complete: (result) => {
        fileData.value = result
        console.log(fileData.value)
      }
    })
  }else{
    fileData.value = null
  }
}
function handleUpload(){
  // 转化csv文件的数据为数组
  
}

hljs.registerLanguage('javascript', javascript)
const code = `module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "standard"
  ],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    "no-var": "warn",
    "init-declarations": ["error", "always"],
    "array-callback-return": "error",
    "block-scoped-var": "error",
    "no-multiple-empty-lines": ["error", { max: 2 }],
    // we like our semi-colons
    semi: ["error", "always"],
    // our codebase doesn't do this at all, so disabled for now
    "space-before-function-paren": ["error", "never"],
    // for now ignore diff between types of quoting
    quotes: "off",
    // this is the style we are already using
    "operator-linebreak": ["error", "before", {
      overrides: {
        "=": "after"
      }
    }],
    // sometimes we declare variables with extra spacing
    indent: ["error", 2, { VariableDeclarator: 2 }],
    // seems like a good idea not to use explicit undefined
    "no-undefined": "error",
    // ensure import specifier contains file extension
    "import/extensions": ["error", "always"]
  },
  overrides: [
    {
      files: ["types/*.ts", "src/*.ts"],
      parser: '@typescript-eslint/parser',
      rules: {
        "import/no-duplicates": "off",
        "import/extensions": "off"
      }
    },
    {
      files: ["src/**/*.js"],
      rules: {
        // make sure there is no Node.js specific API slipping into the source files
        "import/no-nodejs-modules": "error",
        "import/no-commonjs": "error"
      }
    },
    {
      files: ["src/languages/*.js"],
      rules: {
        "no-unused-expressions": "off",
        // languages are all over the map and we don't want to
        // do a mass edit so turn off the most egregious rule violations
        // indent: "off",
        camelcase: "off",
        "no-control-regex": "off",
        "no-useless-escape": "off",
        "comma-dangle": "off",
        "array-bracket-spacing": ["error", "always"
          // {
          //   objectsInArrays: true
          // }
        ],
        // "object-curly-spacing": "warn",
        // "key-spacing": "off",
        // "array-bracket-spacing": ["warn"],
        "array-bracket-newline": ["warn", {
          multiline: true,
          minItems: 2
        }],
        "array-element-newline": "warn",
        "object-curly-newline": [1, {
          minProperties: 2
        }],
        "object-property-newline": [2,
          { allowAllPropertiesOnSameLine: false }
        ]
      }
    },
    {
      files: ["demo/**/*.js"],
      globals: {
        hljs: "readonly"
      }
    },
    {
      files: ["test/**/*.js"],
      globals: {
        should: "readonly"
      },
      env: {
        mocha: true
      },
      parserOptions: {
        ecmaVersion: 2018
      }
    },
    {
      files: ["tools/**/*.js"],
      parserOptions: {
        ecmaVersion: 2018
      },
      rules: {
        camelcase: "off"
      }
    }
  ]
};
`
</script>

<style scoped>
.flex-wrapper{
  display: flex;
  flex-direction: row;
}
.left-flex-item{
  max-width: 63%;
  overflow-x: hidden;
  flex: 0 0 auto;
}
.right-flex-item{
  padding-top: 3.2em;
  margin-left: .6em;
  flex: 1 1 auto;
}
.output{
  box-sizing: border-box;
  width: 100%;
  max-height: 85vh;
}
.subtitle{
  margin: 0;
  font-size: 1.1em;
  font-weight: 600;
}
.text-body{
  margin: 0 0 .8em 0;
  font-size: 1em;
}
.code-block{
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.upload-box{
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
.cascader-input{
  width: 50%;
  margin: 1.2em auto;
  overflow-x: hidden;
}
.upload-content{
  margin: 1.2em 0;
}
.upload-btn{
  margin: 1.2em 0;
}
</style>