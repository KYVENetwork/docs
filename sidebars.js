/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
    communitySidebar: [[{type: 'autogenerated', dirName: 'community'}]],
    validatorSidebar: [[{type: 'autogenerated', dirName: 'validators'}]],
    developerSidebar: [[{type: 'autogenerated', dirName: 'developers'}]],
    learnSidebar: [[{type: 'autogenerated', dirName: 'learn'}]],
    accessDataSetsSidebar: [[{type: 'autogenerated', dirName: 'access-data-sets'}]],
    buildSidebar: [[{type: 'autogenerated', dirName: 'build'}]],
    runANodeSidebar: [[{type: 'autogenerated', dirName: 'run-a-node'}]],
};

export default sidebars;
