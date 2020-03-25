const path = require('path');
const fs = require('fs');
const {exec} = require('child_process');
const {pascalCase} = require('change-case');
const Promise = require('bluebird');

const {api, getIconJSXTemplate, svgo} = require('./utils');

const IconsDir = path.resolve(__dirname, '../src/components/Icons');

const getIconFolderPath = (name) => path.resolve(IconsDir, pascalCase(name));

const writeFile = Promise.promisify(fs.writeFile);

/**
 * clear icons dir except Icon.jsx and Icon.css files
 *
 */
const clearIconsDir = () => {
  exec(`rm -rf ${IconsDir} -v !(Icon.jsx) !(Icon.css)`);
};

/**
 * generate icon component
 * [iconName].jsx and [iconName].svg  files
 *
 * @param iconNode
 * @return {Promise<void>}
 */
const generateIcon = async (iconNode) => {
  const iconUrl = await api.getSvgImageUrl(iconNode.id);

  const iconName = pascalCase(iconNode.name);
  const iconFolderPath = getIconFolderPath(iconName);

  if (!fs.existsSync(iconFolderPath)) {
    fs.mkdirSync(iconFolderPath);
  }

  const {data: iconContent} = await api.getImageContent(iconUrl);
  const {data: optimizedIconContent} = await svgo.optimize(iconContent);

  const iconJSXTemplate = getIconJSXTemplate(iconName);

  await Promise.all([
    writeFile(path.resolve(iconFolderPath, `${iconName}.svg`), optimizedIconContent, {encoding: 'utf8'}),
    writeFile(path.resolve(iconFolderPath, `${iconName}.jsx`), iconJSXTemplate, {encoding: 'utf8'})
  ]);

  console.log(`${iconName} was written success!`);
};

/**
 * generate icons components
 *
 * @param {[Object]} iconNodesArr - array of icon nodes from frame
 * @return {Promise<void>}
 */
const generateIcons = async (iconNodesArr) => {
  await Promise.map(iconNodesArr, generateIcon, {
    concurrency: Number.parseInt(process.env.CONCURRENCY),
  });
};

/**
 * generate index.js with imports
 *
 * @param iconNodesArr - array of icon nodes from frame
 */
const generateImports = (iconNodesArr) => {
  const fileWithImportsPath = path.resolve(IconsDir, 'index.js');

  const importsContent = iconNodesArr
    .map(iconNode => {
      const iconName = pascalCase(iconNode.name);

      return `export * from './${iconName}/${iconName}';`;
    })
    .join('\n');

  fs.writeFileSync(fileWithImportsPath, importsContent, {encoding: 'utf8'});

  console.log(`imports was written success!`);
};

const main = async () => {
  clearIconsDir();

  const iconNodesArr = await api.getNodeChildren(process.env.FRAME_WITH_ICONS_ID);

  await Promise.all([
    generateIcons(iconNodesArr),
    generateImports(iconNodesArr)
  ])
};

module.exports = main;
