# how-to-deliver-svg-icons-to-react
Learn how to deliver SVG icons to React using Figma API

Code implementations for automare delivery svg icons from Figma to React project. 
Check all branches with difference features. 

Figma project [example](https://www.figma.com/file/B1v7c2kZ8EnvF3tLlxmT69/how-to-delivery-svg-from-figma-to-react).
For more information you can read [my article](https://levelup.gitconnected.com/learn-svg-to-react-using-figma-api-be0a5f9c0ca).

## Try yourself 

You can clone the repo and try the example on your Figma project.

#### 1. Create frame with icons
All icons should be palced in one specific frame and implements like a figma component.
Figma icons naming convention: `icon-[name]`.

#### 2. Set Figma settings
Create in root dir `.env` file.

Example of URL in browser, when you pick frame with icons
```
https://www.figma.com/file/B1v7c2kZ8EnvG3tLlxmT89/how-to-delivery-svg-from-figma-to-react?node-id=2%3A3
```
Exmaple .env file

```
FIGMA_TOKEN="31972-e6f223ff-3ca1-4c15-ba90-928da496b4bb"
FILE_KEY="B1v7c2kZ8EnvG3tLlxmT89"
FRAME_WITH_ICONS_ID="2:3"
```

NOTE: `FILE_KEY` and `FRAME_WITH_ICONS_ID` you can get from browser url when select frame. But in url frame id is encoded uri value. You should decode it. You can make in right in `dev tools console`
```
> decodeURIComponent('2%3A3')
<- '2:3'
```

#### 3. Run project and overview results

1. install dependencies
```
yarn
```

2. start project
```
yarn start
```
