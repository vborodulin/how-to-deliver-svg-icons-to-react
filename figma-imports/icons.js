const path = require('path');
const fs = require('fs');
const {exec} = require('child_process');
const {pascalCase} = require('change-case');

const {api, getIconJSXTemplate} = require('./utils');

const IconsDir = path.resolve(__dirname, '../src/components/Icons');

const getIconFolderPath = (name) => path.resolve(IconsDir, pascalCase(name));

/**
 * clear Icons folder except Icon.jsx and Icon.css file
 *
 */
const clearIconsFolder = () => {
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
  fs.writeFileSync(path.resolve(iconFolderPath, `${iconName}.svg`), iconContent, {encoding: 'utf8'});

  const iconJSXTemplate = getIconJSXTemplate(iconName);
  fs.writeFileSync(path.resolve(iconFolderPath, `${iconName}.jsx`), iconJSXTemplate, {encoding: 'utf8'});

  console.log(`${iconName} was written success!`);
};

const generateImports = (iconNodes) => {
  const fileWithImportsPath = path.resolve(IconsDir, 'index.js');

  const importsContent = iconNodes
    .map(iconNode => {
      const iconName = pascalCase(iconNode.name);

      return `export * from './${iconName}/${iconName}';`;
    })
    .join('\n');

  fs.writeFileSync(fileWithImportsPath, importsContent, {encoding: 'utf8'});

  console.log(`imports was written success!`);
};

const main = async () => {
  clearIconsFolder();

  const iconNodesArr = await api.getNodeChildren(process.env.FRAME_WITH_ICONS_ID);

  for await (let iconNode of iconNodesArr) {
    await generateIcon(iconNode);
  }

  await generateImports(iconNodesArr);
};

module.exports = main;
