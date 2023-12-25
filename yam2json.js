const fs = require('fs');
const yaml = require('js-yaml');

function yamlToJson(yamlFilePath, jsonFilePath) {
  try {
    // 读取YAML文件内容
    const yamlContent = fs.readFileSync(yamlFilePath, 'utf8');

    // 将YAML解析为JavaScript对象
    const jsonObj = yaml.load(yamlContent);

    // 将JavaScript对象转换为JSON字符串
    let jsonString = JSON.stringify(jsonObj, null, 2); // 第三个参数是缩进空格数，可选
    // 将JSON字符串写入文件
    fs.writeFileSync(jsonFilePath, jsonString, 'utf8');

    console.log(`转换成功: ${yamlFilePath} -> ${jsonFilePath}`);
  } catch (error) {
    console.error(`转换失败: ${yamlFilePath} -> ${jsonFilePath}`);
    console.error(error);
  }
}
function removeNonUnicodeCharacters(inputString) {
  // 使用正则表达式匹配Unicode字符范围
  const unicodePattern = /[^\x00-\x7F]/g;

  // 过滤掉非Unicode字符
  const filteredString = inputString.replace(unicodePattern, '');
  console.log(filteredString)
  return filteredString;
}

// 用法示例
const yamlFilePath = 'AIrenge.yml';
const jsonFilePath = 'AIrenge.json';
yamlToJson(yamlFilePath, jsonFilePath);
