const PATH_TO_COMPONENT = '/app/components/';
const PATH_TO_COMPONENT_STATELESS = '/app/components/components-stateless/';

// eslint-disable-next-line
function templateUrlGenerate(moduleName) {
  const kebap = moduleName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  return `${PATH_TO_COMPONENT}${kebap}/${kebap}.template.html`;
}

// eslint-disable-next-line
function templateUrlGenerateStateless(moduleName) {
  const kebap = moduleName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  return `${PATH_TO_COMPONENT_STATELESS}${kebap}/${kebap}.template.html`;
}
