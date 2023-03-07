import GenerateConfig from "../../assets/Generate/GenerateConfig.mjs";

const generateSection = new GenerateConfig;

const generateConfig = document.querySelector(".generate-config");

generateConfig.appendChild(generateSection.root);